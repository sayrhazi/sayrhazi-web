# Cahier des charges — Site web Sayrhazi

> **Projet :** Sayrhazi-web — site vitrine de Sayrhazi.
> **Porteur :** Lawi Ibrahim Salim.
> **Statut :** à valider par Lawibrahim (agent) avant implémentation.
> **Dépôt :** `C:\Users\Lawibrahim\Documents\Sayrhazi-web` (Sayrhazi à initialiser ici : `Sayrhazi .`).
> **Chemin Sayrhazi :** `C:\Users\Lawibrahim\Documents\Sayrhazi` ; le système agentic Sayrhazi.

## 1. Contexte et objectif

Sayrhazi est un workflow multi-agents portable (moteur Python ; dashboard TUI en option via `textual`), distribué via npm (`npm install -g sayrhazi`) et GitHub (`https://github.com/Lawi-Salim/sayrhazi`). Il n'a aujourd'hui aucune vitrine : l'installation se fait par README et bouche-à-oreille.

Objectif : un site statique qui présente Sayrhazi, fait démarrer en 3 commandes et redirige vers npm/GitHub. Aucun backend, aucune donnée utilisateur, aucun compte.

## 2. Stack imposée

- React + TypeScript + Vite + Tailwind CSS (pas d'Astro : bloqué par Windows Defender sur la machine de développement).
- Site 100 % statique (`vite build` → `dist/`), hébergé sur GitHub Pages.
- Dépôt séparé du noyau Sayrhazi (le noyau reste pur : `core/`, `engine/`, `cli/`, `runtimes/`, sans site).
- Design repris du thème existant `C:\Users\Lawibrahim\Downloads\sayrhazi-them` (v0.5.0, vanilla single-page) : on porte ses tokens et composants en React+Tailwind, on ne repart pas de zéro (voir §5).

## 3. Contenu (source de vérité = dépôt Sayrhazi, version en cours)

Tout contenu descriptif est repris du dépôt, jamais réinventé. Le thème d'origine est calé sur la v0.5.0 et donc **périmé** : ne pas recopier ses affirmations (ex. « seule transition build → Hadji », « stdlib partout » — le dashboard TUI requiert `textual`).

| Page / section | Source |
|---|---|
| Présentation, banner, commandes | `README.md` du noyau |
| Installation (npm d'abord) | `docs/installation.md`, `package.json` (`sayrhazi`) |
| Liste des 6 agents + rôles + couleurs | `docs/agents.md`, `core/agents/` |
| Workflow (plan → design → build → review → security → QA, transitions auto, sessions par agent) | `docs/automation.md`, `README.md` |
| Versions | `CHANGELOG.md` (généré ou recopié à chaque release) |
| Liens | GitHub (`Lawi-Salim/sayrhazi`), npm (`sayrhazi`) |

## 4. Pages (multi-pages, pas de page unique)

Le thème d'origine est une page unique : on éclate en pages, une route par sujet.

1. **Accueil** : nom + banner + phrase de présentation + boutons `npm install -g sayrhazi` (copiable), GitHub, Démarrage. Section agents (6 cartes : nom, rôle, couleur).
2. **Démarrage** : prérequis (Python ≥ 3.10, Node LTS, OpenCode), 3 commandes (`npm install -g sayrhazi` → `sayrhazi .` → `tunda sayrhazi`), vérification attendue, liens détaillés.
3. **Versions** : liste depuis `CHANGELOG.md`, dernière version en avant.
4. **Pied de page** : licence (tous droits réservés), lien dépôt, lien npm.

Hors MVP (plus tard, uniquement si besoin) : page agents détaillée, playground, blog/changelog navigable, i18n.

## 5. Design (repris de `sayrhazi-them`, porté en React+Tailwind)

- Mouvement : swiss editorial / terminal brutalism léger — panneau de contrôle imprimé, pas de look dashboard générique ; composition en bandes pleine largeur avec rails, annotations marginales, cartes bordées.
- Palette : fond ivoire, encre presque noire, bleu cobalt (liens système) + bleu Sayrhazi `#269CD8`, chartreuse électrique `#d8ff4f` (activité/validation).
- Signatures : marque hexagonale (monogramme `S` + ligne de workflow), grille pointillée discrète, badges de statut monospace.
- Typographie : `DM Sans` (titres/textes), `IBM Plex Mono` (commandes, statuts, métadonnées).
- Voix : directe, factuelle (« Un rôle. Un rapport. Une transition vérifiable. »).
- Responsive desktop + mobile 390, animations courtes sans parallaxe, zéro erreur console.
- Français (comme toute la documentation Sayrhazi).

## 6. Contraintes techniques

- Build reproductible : `yarn install` + `yarn build` verts, `yarn lint` vert.
- Aucun appel réseau au runtime (pas de fetch vers npm/GitHub en direct ; versions figées au build).
- Pas de tracking, pas de cookie, pas de formulaire.
- Accessibilité de base : landmarks, contrastes, navigation clavier.

## 7. Critères d'acceptation

- [ ] `yarn build` produit `dist/` déployable sur GitHub Pages sans configuration exotique.
- [ ] Les 3 commandes de démarrage sont copiables et exactes (testées contre la 0.12.2).
- [ ] Les 6 agents affichent nom, rôle et couleur conformes à `docs/agents.md`.
- [ ] La page Versions reflète `CHANGELOG.md` à la release en cours.
- [ ] Mobile 390 sans défilement horizontal, console zéro erreur.
- [ ] `tunda sayrhazi` n'est pas applicable ici (pas un projet Sayrhazi au sens workflow) — le QA se fait par Zawadi au navigateur réel si disponible, sinon relecture.

## 8. Jalons

1. Lawibrahim valide ce cahier (décisions §4–§5 arbitrées, périmètre MVP figé) → `plan.txt`.
2. Bamse pose le squelette Vite+React+TS+Tailwind (le dossier est vide : squelette d'abord).
3. Contenus + design → revue Hadji → QA Zawadi → clôture.
