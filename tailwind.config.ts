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
        background: "#FAF5EF",
        foreground: "#2A2620",
        // "Midnight Boutique" extracted logo palette (#1B1F3B)
        navy: {
          DEFAULT: "#1B1F3B",
          dark: "#12152A",
          light: "#262C52",
        },
        roseGold: {
          DEFAULT: "#C9A567",
          light: "#DFBE98",
          dark: "#A88346",
        },
        blush: {
          DEFAULT: "#D8A7A0",
          light: "#EAD0CD",
          dark: "#B87F78",
        },
        ivory: {
          DEFAULT: "#FAF6F0",
          card: "#FFFFFF",
          muted: "#F4EBE2",
          cream: "#F5F0E8",
        },
        charcoal: {
          DEFAULT: "#2A2620",
          light: "#4A453C",
          muted: "#736C61",
        },
        mutedMauve: {
          DEFAULT: "#B9707D",
          light: "#CF8B97",
          dark: "#9E5360",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
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
        luxury: "0 10px 30px -10px rgba(20, 33, 61, 0.08)",
        floating: "0 20px 40px -15px rgba(20, 33, 61, 0.15)",
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
