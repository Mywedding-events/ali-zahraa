import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ["Pinyon Script", "cursive"],
        roman: ["Cinzel", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        paper: "#eee3d4",
        "paper-warm": "#f8f1e8",
        ink: "#5c5048",
        terracotta: "#ad5c3d",
        gold: "#855d1d",
      },
    },
  },
  plugins: [],
};

export default config;
