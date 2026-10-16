import { DATE_NOYAU, VERSION_NOYAU } from "../data/site";
import { VERSIONS } from "../data/versions";

export default function Versions() {
  const [derniere, ...precedentes] = VERSIONS;

  return (
    <>
      <section className="grille-pointee-sombre bg-encre text-white" aria-labelledby="titre-versions">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            Versions / <span className="text-chartreuse">figées au build</span>
          </p>
          <h1 id="titre-versions" className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            La release en cours <span className="text-chartreuse">d’abord.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Liste reprise du journal des changements du noyau à la release {VERSION_NOYAU} du {DATE_NOYAU}.
            Aucun appel réseau au runtime : ces notes sont statiques.
          </p>
        </div>
      </section>

      <section className="grille-pointee-sombre bg-encre" aria-labelledby="titre-derniere">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="titre-derniere" className="sr-only">Dernière version</h2>
          <article className="rounded-xl border border-white/20 bg-encre p-6 text-white sm:p-8" aria-label={`Version ${derniere.version}`}>
            <p className="inline-block rounded border border-white/20 bg-encre px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-chartreuse">
              Dernière version · {derniere.date}
            </p>
            <h3 className="mt-4 font-mono text-4xl font-bold text-chartreuse sm:text-5xl">{derniere.version}</h3>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed sm:text-base">
              {derniere.points.map((point) => (
                <li key={point.slice(0, 32)} className="flex gap-2">
                  <span aria-hidden="true">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <h2 className="mt-12 text-3xl font-bold">Versions précédentes</h2>
          <ol className="mt-6 space-y-4">
            {precedentes.map((entree) => (
              <li key={entree.version} className="rounded-xl border border-white/30 bg-encre p-5 min-w-0">
                <div className="flex flex-wrap items-center gap-3 min-w-0">
                  <h3 className="font-mono text-xl font-bold truncate">{entree.version}</h3>
                  <span className="rounded border border-white/25 px-2 py-0.5 font-mono text-[11px] text-white/85 shrink-0">
                    {entree.date}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-white">
                  {entree.points.map((point) => (
                    <li key={point.slice(0, 32)} className="flex gap-2">
                      <span aria-hidden="true">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-xs text-white/85">
            Source : CHANGELOG.md du noyau, version {VERSION_NOYAU}. Le site vitrine ne réinterprète aucune note.
          </p>
        </div>
      </section>
    </>
  );
}