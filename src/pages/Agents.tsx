import { AGENTS_DETAILLES } from "../data/agents";
import HeroAgents from "../components/HeroAgents";
import SectionAgent from "../components/SectionAgent";

export default function Agents() {
  return (
    <>
      <HeroAgents />
      <div className="grille-pointee-sombre bg-encre">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6">
          {AGENTS_DETAILLES.map((agent, index) => (
            <SectionAgent key={agent.nom} agent={agent} index={index} />
          ))}
          <p className="font-mono text-xs text-white/60">
            Source : docs/agents.md et core/agents/ du noyau à la release 0.13.0. Données figées au build.
          </p>
        </div>
      </div>
    </>
  );
}
