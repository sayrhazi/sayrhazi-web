# Sauvegarde intégrale du plan FEATURE-002 (remplacé par FEATURE-003 le 2026-10-16T11:25:02+00:00)

task_id: FEATURE-002 — status: À IMPLÉMENTER — completed_at: 2026-10-16T00:29:58+00:00
summary: Page Agents détaillée en 6 sections sourcées noyau 0.13.0 sur base FEATURE-001 validée.

Contexte : FEATURE-001 bouclée et archivée dans `.opencode/features/FEATURE-001.md`. Sources : `docs/agents.md` et `core/agents/` du noyau en 0.13.0. Confirmation utilisateur du 2026-10-16.

1. Contenu : route `/agents`, hero « Les six agents », 6 sections ordre workflow (Lawibrahim, Ali, Bamse, Hadji, Hifadhui, Zawadi) avec nom, rôle, pastille couleur, description, fichier source, rapports, lien doc. — À IMPLÉMENTER.
2. Gel des données : `src/data/agents.ts` exporte `AGENTS_DETAILLÉS`, figé au build, sans appel réseau. — À IMPLÉMENTER.
3. Structure : `src/pages/Agents.tsx` sur `<Route path="/agents">`, composants `HeroAgents.tsx`, `SectionAgent.tsx`, `CarteAgentDetaillee.tsx` (palette `bg-encre`, `grille-pointee-sombre`, accents `#249CD8`), `grid grid-cols-1 md:grid-cols-2 gap-6`, Ali à false. — À IMPLÉMENTER.
4. Navigation : lien `Agents` déjà présent navbar et footer, rien à créer. — À IMPLÉMENTER.
5. Contraintes : statique sans réseau runtime, lint/build/test verts, `dist/` + `404.html`, français, 390/375 sans défilement, console zéro erreur, 4,5:1. — À IMPLÉMENTER.
6. Accessibilité : landmarks, `h1`/`h2`, focus visible, clavier, `aria-label` pastilles. — À IMPLÉMENTER.
7. QA : Zawadi 6 sections, pastilles, responsive, navigation SPA, console. — À IMPLÉMENTER.

Build Bamse TERMINÉ livré le 2026-10-16T00:33:29+00:00 (agents.ts, 3 composants, route branchée, lint/build/test verts). Validations Hadji, Hifadhui, Zawadi à confirmer avant archivage en `.opencode/features/FEATURE-002.md`. Dette reportée : AGENTS.md §4, design_required, clés fragiles, execCommand.
