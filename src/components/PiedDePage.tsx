import { LIENS } from "../data/site";

export default function PiedDePage() {
  const base = import.meta.env.BASE_URL;
  return (
    <footer className="border-t border-white/15 bg-encre">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`${base}sayrhazi-logo.svg`}
            alt="Logotype Sayrhazi"
            className="h-7 w-auto"
            width={133}
            height={41}
          />
        </div>
        <p className="max-w-xl text-sm text-white/85">
          Workflow multi-agents portable, orchestré via OpenCode.
          <br />
          © 2026 Sarhi. Tous droits réservés.
        </p>
        <nav aria-label="Liens de pied de page">
          <ul className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <li>
              <a className="rounded-sm px-1 underline decoration-white/60 decoration-2 underline-offset-4 hover:bg-white hover:text-encre" href={LIENS.github} target="_blank" rel="noreferrer noopener">
                Dépôt GitHub ↗
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}