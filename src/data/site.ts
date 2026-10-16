export interface Agent {
  nom: string;
  role: string;
  description: string;
  couleur: string;
  fichier: string;
}

/* Contenu gelé sur le noyau à la release en cours (0.13.2 du 2026-10-16).
   Sources : README.md, docs/installation.md, docs/agents.md, package.json (sayrhazi).
   Aucune affirmation du thème v0.5.0 n'est reprise. */

export const VERSION_NOYAU = "0.13.2";
export const DATE_NOYAU = "2026-10-16";

export const PRESENTATION =
  "Sayrhazi est un workflow multi-agents portable pour structurer le développement logiciel, orchestré via OpenCode. Chaque agent a un rôle précis et cloisonné.";

export const DESCRIPTION_PAQUET =
  "Workflow multi-agents portable (moteur Python ; dashboard TUI en option via textual)";

export const LIENS = {
  github: "https://github.com/sayrhazi/sayrhazi",
  npm: "https://www.npmjs.com/package/sayrhazi",
} as const;

export const COMMANDES = [
  {
    titre: "Installer",
    commande: "npm install -g sayrhazi",
    detail: "Installe le paquet sayrhazi depuis npm, sans clone requis.",
  },
  {
    titre: "Intégrer",
    commande: "sayrhazi .",
    detail:
      "Depuis le projet cible : recopie les six agents et le moteur, crée la configuration si absente, préserve rapports et décisions.",
  },
  {
    titre: "Vérifier",
    commande: "tunda sayrhazi",
    detail:
      "Diagnostic : structure, six agents, zéro A_COMPLETER, schéma conforme, contrat des rapports et version face au noyau.",
  },
] as const;

export const PREREQUIS = [
  {
    nom: "Python 3.10 ou supérieur",
    detail: "Moteur Sayrhazi en Python, sans Docker par défaut.",
  },
  {
    nom: "Node.js LTS",
    detail: "Distribution via npm et exécution d'OpenCode.",
  },
  {
    nom: "OpenCode",
    detail: "Installation par « npm install -g opencode-ai », offre gratuite, sans connexion manuelle.",
  },
  {
    nom: "Git recommandé",
    detail: "Clonage du dépôt et suivi des rapports et décisions.",
  },
] as const;

export const AGENTS: Agent[] = [
  {
    nom: "Lawibrahim",
    role: "Réflexion et architecture",
    description:
      "Discute le besoin, explore les options et consigne la décision validée dans plan.txt. Ne code pas et ne review jamais.",
    couleur: "#8B5CF6",
    fichier: "plan.txt",
  },
  {
    nom: "Ali",
    role: "Design UI/UX",
    description:
      "Maquettes, écrans, composants, responsive et thèmes dans design.txt. Crée la structure visuelle neuve, sans toucher à l'existant ni à la logique.",
    couleur: "#3B82F6",
    fichier: "design.txt",
  },
  {
    nom: "Bamse",
    role: "Implémentation",
    description:
      "Implémente depuis plan.txt et design.txt, vérifie puis écrit build.txt. Seul à modifier le code existant et la logique.",
    couleur: "#22C55E",
    fichier: "build.txt",
  },
  {
    nom: "Hadji",
    role: "Qualité générale",
    description:
      "Vérifie bugs, régressions, logique, architecture et performance dans review.txt. Ne couvre pas la sécurité et ne modifie pas le code.",
    couleur: "#F59E0B",
    fichier: "review.txt",
  },
  {
    nom: "Hifadhui",
    role: "Sécurité",
    description:
      "Examine injections, XSS, authentification, sessions, secrets, dépendances et accès dans security.txt. Ne modifie pas le code.",
    couleur: "#EF4444",
    fichier: "security.txt",
  },
  {
    nom: "Zawadi",
    role: "QA réelle",
    description:
      "Teste le rendu réel au navigateur, les parcours et le responsive dans qa.txt. Ne déduit jamais un rendu du seul code.",
    couleur: "#14B8A6",
    fichier: "qa.txt",
  },
];
