import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base conditionnelle : sous-chemin Pages en CI (`/sayrhazi-web/` via
// GITHUB_ACTIONS), racine en dev local (localhost:5175 inchangé).
// SPA fallback via 404.html.
const basePages = process.env.GITHUB_ACTIONS === "true" ? "/sayrhazi-web/" : "/";

export default defineConfig({
  plugins: [react()],
  base: basePages,
  server: {
    port: 5175,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
