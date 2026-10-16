// scripts/sync-noyau.cjs — Synchronise la vitrine sur le noyau Sayrhazi.
//
// Exécuté en `prebuild` (build uniquement, jamais au runtime) : lit la
// version et le journal du noyau, met à jour `src/data/site.ts`
// (VERSION_NOYAU, DATE_NOYAU, commentaire d'en-tête) et ajoute à
// `src/data/versions.ts` les entrées absentes du fichier committé.
//
// Source : `SAYRHAZI_CORE_DIR` (checkout local, dev hors-ligne et preuve
// locale) ou, à défaut, `raw.githubusercontent.com` (latest `main`, sans
// authentification ni token). Timeout 15 s, parsing texte seul, aucune
// exécution de contenu distant.
//
// Union : les points committés sont préservés à l'identique, seules les
// entrées absentes sont ajoutées (condensées de façon déterministe), le
// tout trié en ordre décroissant.
//
// En cas d'échec réseau, de timeout ou d'erreur de parsing, les fichiers
// committés sont conservés avec un avertissement : le build ne casse
// jamais (sortie 0 dans tous les cas).

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_TS = path.join(ROOT, "src", "data", "site.ts");
const VERSIONS_TS = path.join(ROOT, "src", "data", "versions.ts");
const RAW_BASE = "https://raw.githubusercontent.com/sayrhazi/sayrhazi/main";
const TIMEOUT_MS = 15000;
const MAX_POINT = 240;

function log(msg) {
  console.log(`[sync-noyau] ${msg}`);
}

function warn(msg) {
  console.warn(`[sync-noyau] AVERTISSEMENT : ${msg} — fichiers committés conservés, build poursuivi.`);
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function lireNoyau() {
  const dirLocal = process.env.SAYRHAZI_CORE_DIR;
  if (dirLocal) {
    const racine = path.resolve(dirLocal);
    const pkgPath = path.join(racine, "package.json");
    const changelogPath = path.join(racine, "CHANGELOG.md");
    if (!fs.existsSync(racine) || !fs.existsSync(pkgPath) || !fs.existsSync(changelogPath)) {
      throw new Error(`checkout local incomplet (${dirLocal})`);
    }
    const pkg = fs.readFileSync(pkgPath, "utf8");
    const changelog = fs.readFileSync(changelogPath, "utf8");
    return { pkg, changelog, source: `checkout local ${racine}` };
  }
  return null;
}

async function lireDistant() {
  const [pkg, changelog] = await Promise.all([
    fetchText(`${RAW_BASE}/package.json`),
    fetchText(`${RAW_BASE}/CHANGELOG.md`),
  ]);
  return { pkg, changelog, source: "latest main (réseau)" };
}

// Découpe le journal en sections { version, date, bullets[] }.
function parseChangelog(md) {
  const sections = [];
  let courante = null;
  for (const ligne of md.split(/\r?\n/)) {
    const titre = ligne.match(/^##\s+(\d+\.\d+\.\d+)\s+[—–-]\s+(\d{4}-\d{2}-\d{2})/);
    if (titre) {
      courante = { version: titre[1], date: titre[2], bullets: [] };
      sections.push(courante);
      continue;
    }
    if (!courante) continue;
    const puce = ligne.match(/^-\s+(.*\S)\s*$/);
    if (puce) {
      courante.bullets.push(puce[1]);
    } else if (courante.bullets.length > 0 && ligne.trim() !== "") {
      courante.bullets[courante.bullets.length - 1] += ` ${ligne.trim()}`;
    }
  }
  return sections.filter((s) => s.bullets.length > 0);
}

// Condensation déterministe d'une puce : markdown allégé, première
// phrase utile, coupée au mot près. Idempotent d'un appel à l'autre.
function condense(bullet) {
  let texte = bullet
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  const SEPARATEURS = /[.](\s|$)| — | : | ; /;
  const nettoyer = (s) => s.replace(/[.:;—\s(]+$/, "");
  const couper = (debut) => {
    const m = texte.slice(debut).search(SEPARATEURS);
    return m < 0 ? -1 : debut + m;
  };
  const equilibre = (fin) => {
    const avant = texte.slice(0, fin);
    return (avant.match(/\(/g) || []).length <= (avant.match(/\)/g) || []).length;
  };
  let coupe = couper(0);
  if (coupe > 0 && !equilibre(coupe)) {
    const repli = texte.slice(0, coupe).lastIndexOf("(");
    coupe = repli > 0 ? repli : -1;
  }
  let candidat = coupe > 0 && coupe < MAX_POINT ? nettoyer(texte.slice(0, coupe)) : texte;
  let base = coupe;
  while (candidat.length < 40) {
    const suivante = couper(base > 0 ? base + 1 : 0);
    if (suivante <= 0 || suivante >= MAX_POINT) {
      candidat = texte;
      break;
    }
    candidat = nettoyer(texte.slice(0, suivante));
    base = suivante;
  }
  texte = candidat;
  if (texte.length > MAX_POINT) {
    texte = texte.slice(0, MAX_POINT).replace(/\s+\S*$/, "") + "…";
  }
  if (!/[.!?…]$/.test(texte)) texte += ".";
  return texte;
}

function cmpVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
  }
  return 0;
}

// Blocs committés avec leur texte intérieur préservé à l'identique
// (forme multiligne comme forme `points: ["..."]` sur une ligne).
function blocsCommits() {
  const contenu = fs.readFileSync(VERSIONS_TS, "utf8");
  const blocs = new Map();
  const re = /  \{\n    version: "(\d+\.\d+\.\d+)",\n    date: "([^"]+)",\n    points: \[(.*?)\],\n  \}(,?)/gs;
  let m = re.exec(contenu);
  while (m) {
    blocs.set(m[1], { date: m[2], inner: m[3] });
    m = re.exec(contenu);
  }
  return { contenu, blocs };
}

function versionSiteCommitee() {
  const contenu = fs.readFileSync(SITE_TS, "utf8");
  const m = contenu.match(/VERSION_NOYAU\s*=\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function formaterPoints(bullets) {
  return bullets.map((b) => `      ${JSON.stringify(condense(b))},`).join("\n");
}

async function main() {
  let noyau = null;
  try {
    noyau = lireNoyau();
    if (!noyau) noyau = await lireDistant();
  } catch (err) {
    warn(`lecture du noyau impossible (${err.message})`);
    return;
  }

  let versionPaquet = null;
  try {
    versionPaquet = JSON.parse(noyau.pkg).version;
  } catch (err) {
    warn(`package.json illisible (${err.message})`);
    return;
  }

  const sections = parseChangelog(noyau.changelog);
  if (sections.length === 0) {
    warn("aucune entrée parsée dans CHANGELOG.md");
    return;
  }
  const derniere = sections[0];
  log(`source : ${noyau.source} — latest ${derniere.version} du ${derniere.date} (paquet ${versionPaquet})`);

  let versionSite = null;
  let contenuVersions = null;
  let blocs = null;
  try {
    versionSite = versionSiteCommitee();
    ({ contenu: contenuVersions, blocs } = blocsCommits());
  } catch (err) {
    warn(`lecture des fichiers committés impossible (${err.message})`);
    return;
  }
  const attendues = (contenuVersions.match(/version:\s*"\d+\.\d+\.\d+"/g) || []).length;
  if (blocs.size === 0 || blocs.size !== attendues) {
    warn(`versions.ts committé illisible (${blocs.size}/${attendues} entrées reconnues)`);
    return;
  }

  if (cmpVersions(derniere.version, versionSite) < 0) {
    warn(`noyau (${derniere.version}) plus ancien que la vitrine (${versionSite})`);
    return;
  }

  const parVersion = new Map();
  for (const [version, b] of blocs) {
    parVersion.set(version, { date: b.date, inner: b.inner, committed: true });
  }
  const manquantes = [];
  for (const s of sections) {
    if (!parVersion.has(s.version)) {
      parVersion.set(s.version, {
        date: s.date,
        inner: `\n${formaterPoints(s.bullets)}\n    `,
        committed: false,
      });
      manquantes.push(s.version);
    }
  }
  const ordre = [...parVersion.keys()].sort((a, b) => cmpVersions(b, a));
  const aJour = manquantes.length === 0 && derniere.version === versionSite;

  try {
    if (!aJour) {
      if (manquantes.length > 0) {
        const ancre = "export const VERSIONS: EntreeVersion[] = [\n";
        const pos = contenuVersions.indexOf(ancre);
        if (pos === -1) throw new Error("ancre VERSIONS introuvable");
        const corps = ordre
          .map((v, i) => {
            const e = parVersion.get(v);
            const virgule = i < ordre.length - 1 ? "," : "";
            return `  {\n    version: ${JSON.stringify(v)},\n    date: ${JSON.stringify(e.date)},\n    points: [${e.inner}],\n  }${virgule}`;
          })
          .join("\n");
        const nouveau = `${contenuVersions.slice(0, pos + ancre.length)}${corps}\n];\n`;
        fs.writeFileSync(VERSIONS_TS, nouveau, "utf8");
        log(`entrées ajoutées : ${manquantes.sort((a, b) => cmpVersions(b, a)).join(", ")}`);
      }
      if (derniere.version !== versionSite) {
        let site = fs.readFileSync(SITE_TS, "utf8");
        site = site.replace(/VERSION_NOYAU\s*=\s*"[^"]+"/, `VERSION_NOYAU = ${JSON.stringify(derniere.version)}`);
        site = site.replace(/DATE_NOYAU\s*=\s*"[^"]+"/, `DATE_NOYAU = ${JSON.stringify(derniere.date)}`);
        site = site.replace(
          /release en cours \([^)]*\)/,
          `release en cours (${derniere.version} du ${derniere.date})`,
        );
        fs.writeFileSync(SITE_TS, site, "utf8");
        log(`site.ts aligné sur ${derniere.version} du ${derniere.date}`);
      }
    } else {
      log(`vitrine déjà à jour (${versionSite}), rien à changer`);
    }
  } catch (err) {
    warn(`écriture impossible (${err.message})`);
  }
}

main().catch((err) => warn(`erreur inattendue (${err.message})`));
