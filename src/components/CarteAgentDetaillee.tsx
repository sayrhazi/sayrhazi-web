import type { AgentDetaille } from "../data/agents";

export default function CarteAgentDetaillee({ agent }: { agent: AgentDetaille }) {
  return (
    <article
      className="rounded-xl border border-white/20 bg-encre p-6"
      style={{ borderLeftColor: agent.couleur, borderLeftWidth: 4 }}
      aria-label={`Fiche détaillée de ${agent.nom}`}
    >
      <p className="text-sm leading-relaxed text-white/85 sm:text-base">{agent.description}</p>
      <dl className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-white/15 p-4">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-white/60">
            Fichier agent
          </dt>
          <dd className="mt-1 font-mono text-sm text-white">{agent.fichier}</dd>
        </div>
        <div className="rounded-lg border border-white/15 p-4">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-white/60">
            Sources noyau
          </dt>
          <dd className="mt-1 font-mono text-sm text-white">{agent.sourceFichier}</dd>
        </div>
        <div className="rounded-lg border border-white/15 p-4">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-white/60">
            Rapports produits
          </dt>
          <dd className="mt-1 font-mono text-sm text-white">{agent.rapports.join(", ")}</dd>
        </div>
        <div className="rounded-lg border border-white/15 p-4">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-white/60">
            Documentation
          </dt>
          <dd className="mt-1 text-sm">
            <a
              href={agent.lienDoc}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-sm px-1 font-mono text-white underline decoration-white/60 decoration-2 underline-offset-4 hover:bg-white hover:text-encre"
            >
              docs/agents.md ↗
            </a>
          </dd>
        </div>
      </dl>
    </article>
  );
}
