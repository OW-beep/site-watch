import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#FBF9F3", kraft: "#EADFC6" },
        sumi: { DEFAULT: "#1A1A1A", soft: "#5B5B57" },
        shu: { DEFAULT: "#D8352A", deep: "#B02419" },
        marker: "#FFE45C",
        pencil: "#2F5DA8",
      },
      fontFamily: {
        display: ["var(--font-yusei)", "var(--font-klee)", "sans-serif"],
        hand: ["var(--font-klee)", "serif"],
        sans: ["var(--font-klee)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
