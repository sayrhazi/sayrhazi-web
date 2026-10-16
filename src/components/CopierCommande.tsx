import { useState } from "react";

interface Proprietes {
  commande: string;
  etiquette: string;
}

export default function CopierCommande({ commande, etiquette }: Proprietes) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(commande);
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2000);
    } catch {
      const zone = document.createElement("textarea");
      zone.value = commande;
      document.body.appendChild(zone);
      zone.select();
      document.execCommand("copy");
      document.body.removeChild(zone);
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void copier()}
      className="w-full inline-flex items-center gap-2 rounded border border-white/20 bg-encre px-3 py-2 font-mono text-sm text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-chartreuse"
      aria-live="polite"
      aria-label={etiquette}
      aria-pressed={copie}
    >
      <span className="font-mono text-sm break-all text-left flex-1 text-white">{commande}</span>
      <span className="flex-shrink-0" aria-hidden="true">
        {copie ? (
          <svg viewBox="0 0 16 16" className="h-5 w-5 text-chartreuse" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8.5l3.5 3.5L13 4.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="sr-only" aria-live="polite">{copie ? "Copié" : "Copier la commande"}</span>
    </button>
  );
}