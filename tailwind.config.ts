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
        paper: "#f6f1e6",
        "paper-warm": "#fbf7ee",
        ink: "#1b2246",
      },
    },
  },
  plugins: [],
};

export default config;
