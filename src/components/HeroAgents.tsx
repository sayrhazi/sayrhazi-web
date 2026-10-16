export default function HeroAgents() {
  return (
    <section className="grille-pointee-sombre bg-encre text-white" aria-labelledby="titre-agents-page">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">
          Les rôles / <span className="text-chartreuse">6 agents</span>
        </p>
        <h1 id="titre-agents-page" className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Les six agents <span className="text-chartreuse">du workflow.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">
          Un rôle précis et cloisonné par agent, un rapport par étape, des
          transitions vérifiables. Contenu repris de la documentation du noyau.
        </p>
      </div>
    </section>
  );
}
