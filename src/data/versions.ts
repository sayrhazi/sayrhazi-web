export interface EntreeVersion {
  version: string;
  date: string;
  points: string[];
}

/* Liste figée au build depuis CHANGELOG.md du noyau à la release 0.13.1 (2026-10-16).
   Synchronisée par scripts/sync-noyau.cjs (prebuild) ou figée manuellement.
   Aucun appel réseau au runtime : ces données sont statiques. */

export const VERSIONS: EntreeVersion[] = [
  {
    version: "0.13.1",
    date: "2026-10-16",
    points: [
      "Nouveau binaire npm sayrhazi-tui : dashboard sans profil terminal, disponible sur le PATH dès l'installation.",
      "Profil tui : premier argument pris comme projet, racine résolue en remontant, flags transmis tels quels.",
      "Dashboard en deux blocs : session affichée d'un côté, agrégats projet de l'autre, légende en en-tête.",
      "Sortie --once sans fuite du balisage Textual, alignement des colonnes corrigé, avec tests.",
    ],
  },
  {
    version: "0.13.0",
    date: "2026-10-15",
    points: [
      "Fin du --session et des seuils : session neuve par appel avec run_id unique, plus de lecture de base ni de rotation.",
      "Nouveau registre core/runtime/models.yaml : fenêtre de contexte par modèle, modèle absent affiché n/d.",
      "Modèle par agent dans les fiches : chaque agent porte son model, payant compris.",
      "Bloc session: retiré du template sayrhazi.yaml et du schéma, configs existantes acceptées sans effet.",
      "docs/automation.md refait (sessions, dashboard) et rapport comme unique mémoire de l'agent.",
      "Dashboard : jauge et tokens en deux colonnes distinctes, alignement verrouillé par test.",
      "Dashboard : session affichée la plus récemment active, plus la plus récemment créée.",
      "Dashboard : contexte à zéro ignoré, dernière valeur réelle conservée.",
      "Dashboard : compaction sans cas particulier, baisse normale affichée.",
      "6 nouveaux tests : appels simultanés, base inaccessible, modèle absent, cache dominant, migration session:, reprise pilotée par les rapports.",
    ],
  },
  {
    version: "0.12.3",
    date: "2026-10-14",
    points: [
      "Lawibrahim exige un cahier des charges d'abord : sur projet neuf, cherche cahier-des-charges.md, SPEC.md ou spec.md, le demande s'il est absent, le lit une fois puis seulement en cas d'ambiguïté.",
      "npm : le postinstall indique comment sourcer les fonctions terminal depuis le paquet installé.",
      "Fonctions de profil : Sayrhazi, tunda, update, info et remove pour Ubuntu, Sayrhazi et sayrhazi coexistent.",
      "CLI harmonisé : sayrhazi nu installe et contrôle dans --project, --version affiche la version.",
    ],
  },
  {
    version: "0.12.2",
    date: "2026-10-14",
    points: [
      "Profil versionné Sayrhazi-Profile.ps1 : fonctions sourcées depuis le dépôt, flags routés vers le CLI.",
      "Zéro chemin machine en dur : README.md et docs/installation.md passent à npm et clone génériques.",
    ],
  },
  {
    version: "0.12.1",
    date: "2026-10-14",
    points: [
      "CLI : sayrhazi --version affiche la version au lieu d'une erreur, y compris sans commande.",
    ],
  },
  {
    version: "0.12.0",
    date: "2026-10-12",
    points: [
      "Reprise après interruption avec --continue : marqueur d'arrêt propre, diagnostic puis reprise du travail inachevé.",
      "Dashboard TUI watch-tui.py avec textual : interface réelle, tableau des six agents, journaux et mode --once.",
      "Nouveau stage rework_qa : un qa.txt à compléter rappelle Bamse automatiquement, avec garde anti-boucle.",
      "Correction des sessions : baselines à zéro à l'adoption d'une session neuve.",
      "Coupe-circuit quota : vague mise en pause dès qu'un agent renvoie quota ou limite de débit.",
    ],
  },
  {
    version: "0.11.1",
    date: "2026-10-10",
    points: [
      "Sessions OpenCode : une session par tâche et par agent, attribution déterministe et rotation suivie.",
      "Cloisonnement d'écriture en session partagée : chaque agent ne produit que son rapport.",
      "Rotation préventive avant saturation et rapport produit malgré le timeout.",
      "Lecture frugale imposée aux six fiches agents.",
    ],
  },
  {
    version: "0.11.0",
    date: "2026-10-06",
    points: [
      "Bannière info sayrhazi en bleu pour le terminal uniquement.",
      "Sessions OpenCode partagées : une session par tâche, usage réel lu dans la base locale, rotation à session.max_usage.",
      "Dossier .opencode/backup/ dédié aux sauvegardes de configuration horodatées.",
    ],
  },
  {
    version: "0.10.1",
    date: "2026-10-05",
    points: [
      "Classification des échecs dans le moteur : quota sans retry, réseau avec backoff, autres erreurs journalisées.",
    ],
  },
  {
    version: "0.10.0",
    date: "2026-10-05",
    points: [
      "Services séparés : les serveurs vivent hors des agents via services.py, santé HTTP et journaux capturés.",
    ],
  },
  {
    version: "0.9.0",
    date: "2026-10-05",
    points: [
      "Parallélisme : étapes éligibles lancées ensemble, bornées par workflow.max_parallel_agents, convergence journalisée.",
    ],
  },
  {
    version: "0.8.0",
    date: "2026-10-05",
    points: [
      "Conditions : security et visual_qa automatiques sous condition, nouvelle étape rework, Ali toujours manuel.",
      "Verrou durci et BOM UTF-8 toléré partout.",
    ],
  },
  {
    version: "0.7.0",
    date: "2026-10-04",
    points: [
      "Moteur généralisé : watch-work.py piloté par workflow.yaml, déclenchement générique par rôle.",
    ],
  },
  {
    version: "0.6.0",
    date: "2026-09-26",
    points: [
      "Licence : passage à tous droits réservés pour l'avenir, versions déjà diffusées restant sous leur licence d'origine.",
      "État et reprise : .opencode/state/workflow-state.yaml, réconciliation en sept points et CLI --reconcile.",
    ],
  },
  {
    version: "0.5.0",
    date: "2026-09-26",
    points: [
      "Configuration déclarative : .opencode/workflow.yaml versionné, seule la revue automatique.",
    ],
  },
  {
    version: "0.4.2",
    date: "2026-09-26",
    points: ["Directive design Ali en quatre temps et protocole de recherche obligatoire."],
  },
  {
    version: "0.4.1",
    date: "2026-09-26",
    points: [
      "Bloc contrat machine exigé en tête de chaque rapport, minuteur visible du moteur.",
    ],
  },
  {
    version: "0.4.0",
    date: "2026-09-26",
    points: [
      "Contrats figés : TERMINÉ pour l'achèvement, VALIDÉ pour les verdicts, completed_at ISO et task_id stable.",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-09-25",
    points: [
      "Présentation uniquement à l'ouverture ou sur demande, typographie française exigée.",
      "Bannière ASCII, remove sayrhazi interactif et nouvelle arborescence core, engine, cli et runtimes.",
    ],
  },
  {
    version: "0.2.4",
    date: "2026-09-22",
    points: ["Validation du schéma, six agents confirmés et MCP Playwright pré-câblé pour Ali et Zawadi."],
  },
  {
    version: "0.2.3",
    date: "2026-09-21",
    points: [
      "Schéma fonctionnel sans dépendance.",
    ],
  },
  {
    version: "0.2.2",
    date: "2026-09-20",
    points: [
      "Scaffolding initial proposé par Lawibrahim, identité visuelle des agents et configuration base de données clarifiée.",
    ],
  },
  {
    version: "0.2.1",
    date: "2026-09-20",
    points: ["Nouvelle commande update sayrhazi et comparaison de version dans tunda sayrhazi."],
  },
  {
    version: "0.2.0",
    date: "2026-09-19",
    points: ["Noms d'affichage des agents configurables par projet, fichiers et rôles stables."],
  },
  {
    version: "0.1.8",
    date: "2026-09-19",
    points: [
      "tunda sayrhazi vérifie d'abord si Sayrhazi est initialisé, verdict NON INSTALLE avec consigne sinon.",
    ],
  },
  {
    version: "0.1.7",
    date: "2026-09-19",
    points: [
      "validate-sayrhazi.py distingue échec d'installation, configuration incomplète et succès complet.",
    ],
  },
  {
    version: "0.1.6",
    date: "2026-09-19",
    points: [
      "Règle commune.",
    ],
  },
  {
    version: "0.1.5",
    date: "2026-09-19",
    points: [
      "Docs alignées sur l'état réel.",
    ],
  },
  {
    version: "0.1.4",
    date: "2026-09-19",
    points: [
      "Template sayrhazi.yaml.",
    ],
  },
  {
    version: "0.1.3",
    date: "2026-09-19",
    points: [
      "Nouveau check optionnel tunda sayrhazi (scripts/tunda.py + fonction profil).",
    ],
  },
  {
    version: "0.1.2",
    date: "2026-09-19",
    points: [
      "Install-Sayrhazi.ps1.",
      "validate-sayrhazi.py.",
    ],
  },
  {
    version: "0.1.1",
    date: "2026-09-19",
    points: [
      "Tous les agents se présentent avec project.name, type et stack lus dans sayrhazi.yaml.",
      "Correction Zawadi.",
      "template/AGENTS.md réécrit comme vrai template projet.",
      "Install-Sayrhazi.ps1 copie désormais opencode.json.",
      "watch-work.py durci.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-09-15",
    points: ["Création du noyau portable Sayrhazi, rôles, modèle sayrhazi.yaml et script d'installation."],
  }
];
