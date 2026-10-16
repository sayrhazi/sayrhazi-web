import type { Agent } from "../data/site";

export default function CarteAgent({ agent, index }: { agent: Agent; index: number }) {
  return (
    <article
      className="flex min-h-[240px] flex-col rounded-xl border border-white/30 bg-encre p-5"
      aria-label={`Agent ${agent.nom}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-white/85">
        {String(index + 1).padStart(2, "0")} — {agent.fichier}
      </span>
      <div className="mt-4 flex items-center gap-3">
        <span
          className="inline-block h-4 w-4 rounded-full border border-white/40"
          style={{ backgroundColor: agent.couleur }}
          aria-hidden="true"
        />
        <h3 className="text-xl font-bold">{agent.nom}</h3>
      </div>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white">
        {agent.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/85">{agent.description}</p>
    </article>
  );
}
