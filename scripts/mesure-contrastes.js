// Mesure les ratios de contraste des couples texte sur fond employés par Sayrhazi-web.
// Référence : WCAG 2.1, seuil AA de 4,5:1 pour le texte courant, 3:1 pour les
// indicateurs non textuels (focus). Exécution : node scripts/mesure-contrastes.js
// Les couples marqués INTERDIT documentent des valeurs connues non conformes
// qui ne doivent apparaître dans aucun texte du site.

function canaux(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = canaux(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(avant, arriere) {
  const [clair, sombre] = [luminance(avant), luminance(arriere)].sort((a, b) => b - a);
  return (clair + 0.05) / (sombre + 0.05);
}

function melange(premier, second, part) {
  const a = canaux(premier);
  const b = canaux(second);
  const mix = a.map((c, i) => Math.round((c * part + b[i] * (1 - part)) * 255));
  return "#" + mix.map((c) => c.toString(16).padStart(2, "0")).join("");
}

const ENCRE = "#090a0b";
const BLEU = "#249cd8";
const BLANC = "#ffffff";
const COBALT = "#1e40ff";
const GRIS = "#8d9290";
const BLANC_60 = melange(BLANC, ENCRE, 0.6);
const BLANC_65 = melange(BLANC, ENCRE, 0.65);
const CLAIR = "#f7f7f3";

const couples = [
  // [texte, fond, usage, seuil]
  [BLANC, ENCRE, "titres et textes courants sur fonds sombres", 4.5],
  [CLAIR, ENCRE, "texte du corps en blanc cassé sur sombre", 4.5],
  [BLANC_60, ENCRE, "mentions atténuées à 60 % sur sombre (pire cas employé)", 4.5],
  [BLANC_65, ENCRE, "mentions atténuées à 65 % sur sombre", 4.5],
  [ENCRE, BLEU, "texte sur accents bleus (boutons, badges, carte Versions)", 4.5],
  [BLEU, ENCRE, "accents bleus sur fonds sombres (héros, métriques, navigation)", 4.5],
  ["#ffffff", ENCRE, "liseré de focus clair sur sombre (non textuel)", 3],
  [ENCRE, "#ffffff", "halo de focus sombre (non textuel)", 3],
];

const interdits = [
  [BLEU, GRIS, "bleu sur gris, mesuré à 1,03 par la QA (gris exclu des fonds)"],
  [BLANC, BLEU, "blanc sur bleu, mesuré à 3,08 par la QA"],
  [COBALT, GRIS, "cobalt sur gris, sous le seuil"],
];

let echec = false;
for (const [texte, fond, usage, seuil] of couples) {
  const r = ratio(texte, fond);
  const ok = r >= seuil;
  if (!ok) echec = true;
  console.log(`${ok ? "CONFORME" : "ÉCHEC"} ${r.toFixed(2)}:1 (seuil ${seuil}) — ${usage} [${texte} sur ${fond}]`);
}
for (const [texte, fond, note] of interdits) {
  console.log(`INTERDIT ${ratio(texte, fond).toFixed(2)}:1 — ${note} [${texte} sur ${fond}]`);
}

if (echec) {
  console.error("Au moins un couple employé est sous son seuil.");
  process.exit(1);
}
console.log("Tous les couples employés respectent leur seuil.");
