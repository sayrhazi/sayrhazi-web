/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Décision 10 (thème sombre) : ivoire et papier passent en fond sombre
        // issu du token encre ; le gris #8D9290 ne subsiste plus comme fond.
        // Bleu #249CD8 confirmé sans réserve (décision 8) ; noms conservés.
        ivoire: "#090a0b",
        papier: "#090a0b",
        encre: "#090a0b",
        cobalt: "#1e40ff",
        sayrhazi: "#249CD8",
        chartreuse: "#249CD8",
      },
      fontFamily: {
        sans: ['"DM Sans"', '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"IBM Plex Mono"', "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
