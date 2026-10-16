import { AGENTS, COMMANDES, PRESENTATION } from "../data/site";
import { Link } from "react-router-dom";
import CarteAgent from "../components/CarteAgent";
import CopierCommande from "../components/CopierCommande";

export default function Accueil() {
  return (
    <>
      <section className="grille-pointee-sombre bg-encre text-white" aria-labelledby="titre-accueil">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h1 id="titre-accueil" className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.02] sm:text-7xl">
            Le workflow
            <br />
            multi-agents.
            <br />
            <span className="text-chartreuse">Vérifiable.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {PRESENTATION}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-white/60">
            Un rôle. Un rapport. Une transition vérifiable.
          </p>
          <div className="mx-auto mt-6 flex max-w-xl flex-col items-stretch gap-2 sm:flex-row">
            <CopierCommande commande={COMMANDES[0].commande} etiquette="Commande d'installation à copier" />
            <Link
              to="/demarrage"
              className="w-full rounded-lg border border-white/40 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-chartreuse hover:text-chartreuse sm:w-auto sm:shrink-0"
            >
              Démarrer en 3 commandes →
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-4 max-w-full">
            {[
              ["6", "rôles spécialisés"],
              ["6", "rapports de suivi"],
              ["1", "transition automatique"],
              ["0", "donnée utilisateur"],
            ].map(([valeur, libelle]) => (
              <div key={libelle} className="bg-encre px-4 py-5 text-center">
                <dt className="sr-only">{libelle}</dt>
                <dd className="text-2xl font-bold text-chartreuse">{valeur}</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/65">{libelle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-white/15 bg-encre" aria-labelledby="titre-agents">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-white/85">01 / <span className="text-chartreuse">Dans le workflow</span></p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="titre-agents" className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              Six rôles.
              <br />
              <span className="text-white">Un relais précis.</span>
            </h2>
            <p className="max-w-sm text-sm text-white/85">
              Les noms d’affichage changent si le projet le décide. Le contrat, lui, reste stable.
              Couleurs et rôles conformes à la documentation du noyau.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((agent, index) => (
              <CarteAgent key={agent.nom} agent={agent} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="grille-pointee-sombre bg-encre" aria-labelledby="titre-protocole">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-white/85">02 / <span className="text-chartreuse">Le protocole</span></p>
          <h2 id="titre-protocole" className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Chaque étape <span className="text-white">laisse une trace.</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-encre p-6 text-white">
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">
                Monprojet / .opencode — local
              </p>
              <pre className="eviter-defilement-horizontal mt-4 overflow-x-auto font-mono text-xs leading-relaxed">
                <code>
{`.opencode/
├── agent/          6 rôles installés
├── sayrhazi.yaml   source de vérité
├── workflow.yaml   parcours déclaratif
├── watch-work.py   build → Hadji
├── resume/         état courant
├── history/        archives
└── features/       travail terminé`}
                </code>
              </pre>
            </div>
            <div className="rounded-xl border border-white/30 bg-encre p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/85">
                Transition réelle — build → Hadji
              </p>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="rounded-lg border border-white/15 p-3">
                  <strong>01 · Bamse</strong> écrit <code>build.txt</code> avec le statut <code>TERMINÉ</code>.
                </li>
                <li className="rounded-lg border border-chartreuse bg-encre p-3">
                  <strong>02 · Moteur</strong> vérifie le contrat : <code>task_id</code> et statut autorisé.
                </li>
                <li className="rounded-lg border border-white/15 p-3">
                  <strong>03 · Hadji</strong> produit <code>review.txt</code>. Le reste demeure sous contrôle humain.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
