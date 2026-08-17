import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--ivory, #FAF5EA)",
        foreground: "var(--ink-navy, #1C1F3B)",
        inkNavy: {
          DEFAULT: "#1C1F3B",
          dark: "#121426",
          light: "#282C52",
        },
        nearBlack: "#0D0E1A",
        ivory: {
          DEFAULT: "#FAF5EA",
          card: "#FAF5EA",
          muted: "#F2E9D8",
          sand: "#E8DCC8",
        },
        sand: {
          DEFAULT: "#E8DCC8",
          dark: "#D6C4A9",
          light: "#F5EFE4",
        },
        zariGold: {
          DEFAULT: "#B4863C",
          light: "#D8BC82",
          dark: "#8B6A2E",
          gradientStart: "#C9A24B",
          gradientEnd: "#8B6A2E",
        },
        oxblood: {
          DEFAULT: "#7A1F2B",
          dark: "#57141E",
          light: "#9E2C3B",
        },
        navy: {
          DEFAULT: "#1C1F3B",
          dark: "#0D0E1A",
          light: "#282C52",
        },
        roseGold: {
          DEFAULT: "#B4863C",
          light: "#D8BC82",
          dark: "#8B6A2E",
        },
        blush: {
          DEFAULT: "#E8DCC8",
          light: "#FAF5EA",
          dark: "#B4863C",
        },
        charcoal: {
          DEFAULT: "#1C1F3B",
          light: "#282C52",
          muted: "#5C6080",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "var(--font-fraunces)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "var(--font-fraunces)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-alex-brush)", "Alex Brush", "cursive"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        bounceSoft: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      letterSpacing: {
        eyebrow: "0.25em",
        wideLuxury: "0.15em",
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(28, 37, 68, 0.08)",
        floating: "0 20px 40px -15px rgba(28, 37, 68, 0.15)",
        card: "0 4px 20px rgba(0, 0, 0, 0.03)",
        roseGold: "0 0 20px rgba(201, 162, 120, 0.25)",
      },
      borderRadius: {
        scallop: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
