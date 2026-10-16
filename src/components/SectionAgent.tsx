import type { AgentDetaille } from "../data/agents";
import CarteAgentDetaillee from "./CarteAgentDetaillee";

interface Proprietes {
  agent: AgentDetaille;
  index: number;
}

export default function SectionAgent({ agent, index }: Proprietes) {
  const identifiant = `agent-${agent.nom.toLowerCase()}`;
  return (
    <section aria-labelledby={identifiant} className="scroll-mt-20">
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-5 w-5 shrink-0 rounded-full border border-white/40"
          style={{ backgroundColor: agent.couleur }}
          role="img"
          aria-label={`Couleur de ${agent.nom} : ${agent.couleur}`}
        />
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">
          {String(index + 1).padStart(2, "0")} / 06
        </p>
      </div>
      <h2 id={identifiant} className="mt-2 text-3xl font-bold sm:text-4xl">
        {agent.nom}{" "}
        <span className="font-mono text-lg font-medium uppercase tracking-widest text-white/70 sm:text-xl">
          {agent.role}
        </span>
      </h2>
      <div className="mt-5">
        <CarteAgentDetaillee agent={agent} />
      </div>
    </section>
  );
}
