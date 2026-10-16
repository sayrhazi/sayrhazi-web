export interface AgentDetaille {
  nom: string;
  fichier: string;
  role: string;
  couleur: string;
  description: string;
  sourceFichier: string;
  rapports: string[];
  lienDoc: string;
}

/* Données figées au build depuis docs/agents.md et core/agents/ du noyau
   à la release 0.13.0 (modèle par agent : muse-spark-1.3 pour les six,
   vision pour Ali et Zawadi). Aucun appel réseau au runtime. */

const DOC_AGENTS =
  "https://github.com/sayrhazi/sayrhazi/blob/main/docs/agents.md";

export const AGENTS_DETAILLES: AgentDetaille[] = [
  {
    nom: "Lawibrahim",
    fichier: "agent/lawibrahim.md",
    role: "architecte — réflexion et architecture",
    couleur: "#8B5CF6",
    description:
      "Discute le besoin avec l'utilisateur, explore les options et clarifie les compromis. Il ne code pas et ne review jamais. Il écrit dans plan.txt uniquement après confirmation explicite d'une décision. Sur un projet neuf, il exige d'abord un cahier des charges, et dans un projet vide il propose une structure initiale type avant toute implémentation.",
    sourceFichier: "core/agents/lawibrahim/ (agent.yaml, contract.yaml, instructions.md)",
    rapports: ["plan.txt"],
    lienDoc: DOC_AGENTS,
  },
  {
    nom: "Ali",
    fichier: "agent/ali.md",
    role: "designer — design UI/UX",
    couleur: "#3B82F6",
    description:
      "Pose les briques visuelles à partir de plan.txt : maquettes, écrans, composants, responsive, thèmes. Il écrit design.txt. Il crée la structure visuelle neuve, ne modifie ni l'existant ni la logique. Sa méthode : cadrer selon le type de projet, chercher des références réelles citées, fonder palette et tokens avant de maquetter, sans plagier.",
    sourceFichier: "core/agents/ali/ (agent.yaml, contract.yaml, instructions.md)",
    rapports: ["design.txt"],
    lienDoc: DOC_AGENTS,
  },
  {
    nom: "Bamse",
    fichier: "agent/bamse.md",
    role: "builder — implémentation",
    couleur: "#22C55E",
    description:
      "Inspecte le projet, applique les décisions validées, implémente la tâche et exécute les vérifications pertinentes. Il archive l'ancien build.txt, puis écrit le nouvel état dans build.txt. Il suit la structure visuelle de design.txt sans la re-maquetter. Seul à modifier le code existant et la logique.",
    sourceFichier: "core/agents/bamse/ (agent.yaml, contract.yaml, instructions.md)",
    rapports: ["build.txt"],
    lienDoc: DOC_AGENTS,
  },
  {
    nom: "Hadji",
    fichier: "agent/hadji.md",
    role: "reviewer — qualité générale",
    couleur: "#F59E0B",
    description:
      "Vérifie les bugs, régressions, erreurs de logique, architecture, performance, tests manquants et cohérence avec les règles du projet. Il écrit review.txt. Il ne modifie pas le code et ne rend pas le verdict sécurité spécialisé de Hifadhui.",
    sourceFichier: "core/agents/hadji/ (agent.yaml, contract.yaml, instructions.md)",
    rapports: ["review.txt"],
    lienDoc: DOC_AGENTS,
  },
  {
    nom: "Hifadhui",
    fichier: "agent/hifadhui.md",
    role: "security — sécurité",
    couleur: "#EF4444",
    description:
      "Examine les injections, XSS, authentification, sessions, contrôle d'accès, secrets, dépendances, fichiers, appels externes, headers, CORS et données utilisateur lorsque ces zones sont concernées. Il écrit security.txt. Il ne modifie pas le code.",
    sourceFichier: "core/agents/hifadhui/ (agent.yaml, contract.yaml, instructions.md)",
    rapports: ["security.txt"],
    lienDoc: DOC_AGENTS,
  },
  {
    nom: "Zawadi",
    fichier: "agent/zawadi.md",
    role: "qa — QA réelle",
    couleur: "#14B8A6",
    description:
      "Teste ce qui est observable dans un navigateur réel ou dans des captures fournies : parcours, responsive, modes visuels, alignement, contraste, états d'erreur. Elle écrit qa.txt. Elle ne déduit jamais un rendu à partir du seul code.",
    sourceFichier: "core/agents/zawadi/ (agent.yaml, contract.yaml, instructions.md)",
    rapports: ["qa.txt"],
    lienDoc: DOC_AGENTS,
  },
];
