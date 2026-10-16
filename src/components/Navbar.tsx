import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LIENS, VERSION_NOYAU } from "../data/site";

const LIENS_NAV = [
  { to: "/", cle: "accueil", libelle: "Accueil" },
  { to: "/demarrage", cle: "demarrage", libelle: "Démarrage" },
  { to: "/versions", cle: "versions", libelle: "Versions" },
  { to: "/agents", cle: "agents", libelle: "Agents" },
];

export default function Navbar() {
  const base = import.meta.env.BASE_URL;
  const location = useLocation();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOuvert(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOuvert(false);
      }
    };
    if (menuOuvert) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOuvert]);

  const basculerMenu = () => setMenuOuvert((o) => !o);
  const fermerMenu = () => setMenuOuvert(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-encre/80 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 relative">
        <Link to="/" className="flex items-center gap-3" aria-label="Sayrhazi, retour à l'accueil">
          <img
            src={`${base}sayrhazi-logo.svg`}
            alt="Logotype Sayrhazi"
            className="h-8 w-auto"
            width={152}
            height={47}
          />
          <span className="rounded border border-white/25 px-2 py-0.5 font-mono text-[10px] text-white/70">
            v{VERSION_NOYAU}
          </span>
        </Link>

        <nav aria-label="Navigation principale">
          {/* Liens desktop (cachés sur mobile) */}
          <ul className="hidden sm:flex items-center gap-2 sm:gap-5">
            {LIENS_NAV.map((lien) => (
              <li key={lien.cle}>
                <Link
                  to={lien.to}
                  aria-current={location.pathname === lien.to ? "page" : undefined}
                  className={`rounded px-2 py-2 font-mono text-[11px] uppercase tracking-widest transition sm:text-xs ${
                    location.pathname === lien.to
                      ? "bg-chartreuse text-encre"
                      : "text-white/75 hover:text-chartreuse"
                  }`}
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton hamburger (mobile uniquement) - à droite */}
        <button
          type="button"
          className="sm:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-chartreuse"
          onClick={basculerMenu}
          aria-expanded={menuOuvert}
          aria-controls="navbar-dropdown"
          aria-label={menuOuvert ? "Fermer le menu principal" : "Ouvrir le menu principal"}
        >
          {menuOuvert ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>

        {/* Dropdown mobile SOUS la navbar */}
        {menuOuvert && (
          <div
            ref={dropdownRef}
            id="navbar-dropdown"
            className="sm:hidden absolute top-full left-0 right-0 z-50 bg-encre/95 backdrop-blur border-b border-white/15 animate-dropdown"
            role="navigation"
            aria-label="Menu principal mobile"
          >
            <ul className="py-3 space-y-1 px-4">
              {LIENS_NAV.map((lien) => (
                <li key={lien.cle}>
                  <Link
                    to={lien.to}
                    onClick={fermerMenu}
                    aria-current={location.pathname === lien.to ? "page" : undefined}
                    className={`block px-3 py-3 rounded-lg font-mono text-sm uppercase tracking-widest transition ${
                      location.pathname === lien.to
                        ? "bg-chartreuse text-encre"
                        : "text-white/80 hover:bg-white/10 hover:text-chartreuse"
                    }`}
                  >
                    {lien.libelle}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={LIENS.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={fermerMenu}
                  className="block px-3 py-3 rounded-lg font-mono text-sm uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-chartreuse transition"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}