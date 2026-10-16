import { COMMANDES, LIENS, PREREQUIS } from "../data/site";
import { Link } from "react-router-dom";
import CopierCommande from "../components/CopierCommande";

export default function Demarrage() {
  return (
    <>
      <section className="grille-pointee-sombre bg-encre text-white" aria-labelledby="titre-demarrage">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">Démarrage / <span className="text-chartreuse">3 commandes</span></p>
          <h1 id="titre-demarrage" className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Commencer sans <span className="text-chartreuse">deviner.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Installation depuis npm d’abord, intégration dans le projet cible, puis vérification.
            Commandes copiables et exactes à la release en cours.
          </p>
        </div>
      </section>

      <section className="grille-pointee-sombre bg-encre" aria-labelledby="titre-prerequis">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="titre-prerequis" className="text-3xl font-bold">Prérequis</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PREREQUIS.map((element) => (
              <li key={element.nom} className="rounded-xl border border-white/30 bg-encre p-5">
                <h3 className="font-bold">{element.nom}</h3>
                <p className="mt-2 text-sm text-white/85">{element.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-white/15 bg-encre" aria-labelledby="titre-commandes">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="titre-commandes" className="text-3xl font-bold">Les trois commandes</h2>
          <ol className="mt-6 space-y-5">
            {COMMANDES.map((etape, index) => (
              <li key={etape.titre} className="rounded-xl border border-white/30 bg-encre p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/85">
                  Étape {index + 1} — {etape.titre}
                </p>
                <div className="mt-3">
                  <CopierCommande commande={etape.commande} etiquette={`Copier la commande ${etape.commande}`} />
                </div>
                <p className="mt-3 text-sm text-white/85">{etape.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-xl border border-white/30 bg-encre p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest">Vérification attendue</h3>
            <p className="mt-2 text-sm leading-relaxed">
              La commande <code>tunda sayrhazi</code> affiche une liste de contrôles : structure du projet,
              six agents présents, zéro <code>A_COMPLETER</code>, schéma conforme, contrat des rapports
              signalé sans bloquer, puis version du projet face au noyau. L’installation ne supprime ni
              les rapports, ni les historiques, ni les décisions existantes.
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-white/20 bg-encre p-5 text-white">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/65">Sans npm, depuis un clone</h3>
            <div className="mt-3 space-y-3">
              <code className="block break-all font-mono text-xs sm:text-sm overflow-x-auto max-w-full">
                git clone https://github.com/sayrhazi/sayrhazi.git
              </code>
              <code className="block break-all font-mono text-xs sm:text-sm overflow-x-auto max-w-full">
                {`& "<clone>\\runtimes\\opencode\\scripts\\Install-Sayrhazi.ps1" -ProjectPath "."`}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="grille-pointee-sombre bg-encre" aria-labelledby="titre-liens">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="titre-liens" className="text-3xl font-bold">Aller plus loin</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-full">
            <li>
              <a href={LIENS.github} target="_blank" rel="noreferrer noopener" className="block rounded-xl border border-white/20 bg-encre p-5 transition hover:border-chartreuse">
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/85">Dépôt</span>
                <span className="mt-2 block font-bold">GitHub sayrhazi/sayrhazi ↗</span>
                <span className="mt-2 block text-sm text-white/85">Code source, documentation et versions.</span>
              </a>
            </li>
            <li>
              <a href={LIENS.npm} target="_blank" rel="noreferrer noopener" className="block rounded-xl border border-white/20 bg-encre p-5 transition hover:border-chartreuse">
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/85">Paquet</span>
                <span className="mt-2 block font-bold">npm sayrhazi ↗</span>
                <span className="mt-2 block text-sm text-white/85">Installation globale recommandée.</span>
              </a>
            </li>
            <li>
              <Link to="/versions" className="block rounded-xl border border-white/20 bg-encre p-5 transition hover:border-chartreuse">
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/85">Suivi</span>
                <span className="mt-2 block font-bold">Page Versions →</span>
                <span className="mt-2 block text-sm text-white/85">Changements figés à la release en cours.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
