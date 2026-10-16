# FEATURE-001 — Vitrine MVP + mobile + alignement 0.13.0 — Archivée

Date de clôture : 2026-10-16T00:29:58+00:00
Projet : Sayrhazi-web — Le site vitrine du système agentic Sayrhazi
Statut final : **BOUCLÉE** (passage à FEATURE-002 confirmé par l utilisateur le 2026-10-16)

## Périmètre livré

Vitrine statique React + TypeScript + Vite + Tailwind à la racine (`dist/` pour GitHub Pages) :
- 3 pages en routage path-based React Router v6 (`/`, `/demarrage`, `/versions`) + route `/agents` en placeholder, pied de page, `404.html` SPA fallback.
- Thème sombre uniforme (`bg-encre` `#090a0b` + `grille-pointee-sombre`), bleu `#249CD8` en accents, hero centré sans image de page, logotypes en navbar et footer uniquement.
- Hero Accueil en bloc unique : `CopierCommande` unifié (commande + icône copie/check, `aria-live`) + lien `Démarrer`.
- Navbar `sticky` floue avec hamburger dropdown sous la barre sur mobile, liens horizontaux sur desktop.
- Contenu gelé sur le noyau **0.13.0 du 2026-10-15** : 3 commandes, prérequis, 6 agents, page Versions à 10 points en tête.

## Décisions marquantes

- MVP 3 pages + pied de page, Ali à false, option A (Vite à la racine), gel sur `CHANGELOG.md` et docs du noyau.
- Routage hash remplacé par path-based avec `404.html` (demande explicite).
- Thème sombre uniformisé sur le sombre du hero, carte Versions passée en sombre.
- Bouton GitHub du hero supprimé (redondant navbar), copie unifiée commande + icône.
- Alignement 0.12.3 puis 0.13.0 + compléments dashboard (deux colonnes, actif-zéro-compaction).
- Chakra écarté, Tailwind conservé.

## Verdicts finaux (build du 2026-10-16T00:23:29+00:00)

- Bamse `build.txt` : **TERMINÉ** — lint, build, test verts, contrastes verts, aucune MOYENNE.
- Hadji `review.txt` : **VALIDÉ** — entrée 0.13.0 à 10 points conforme, aucune réserve bloquante.
- Hifadhui `security.txt` : **VALIDÉ AVEC RÉSERVES** — FAIBLE d hygiène uniquement (execCommand, en-têtes délégués, Fonts tiers, provenance images).
- Zawadi `qa.txt` : **VALIDÉ AVEC RÉSERVES** — aucune MOYENNE, FAIBLE uniquement (placeholder `/agents` attendu, drapeau playwright, dette reconduite).

## Dette résiduelle (reportée, non bloquante)

- `AGENTS.md` §4 règles locales à compléter ; `quality.design_required` à aligner sur false.
- Clés de liste fragiles `point.slice(0, 32)` ; repli `execCommand` déprécié.
- Presse-papiers réel, clavier physique, lecteur d écran, colorimètre non vérifiés en automatisé.

## Historique des rapports

Dernier état au moment de la clôture dans `.opencode/resume/` (`plan.txt` FEATURE-001, `build.txt`, `review.txt`, `security.txt`, `qa.txt`) ; journaux précédents dans `.opencode/history/` (`build-log.md`, `review-log.md`, `security-log.md`, `qa-log.md`, `workflow-log.md`).
