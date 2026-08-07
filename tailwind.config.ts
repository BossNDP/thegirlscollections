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
        background: "#FAF7F2",
        foreground: "#1C2544",
        // Rich Royal Navy palette (sampled directly from logo.png #1C2544)
        navy: {
          DEFAULT: "#1C2544",
          dark: "#121930",
          light: "#253158",
        },
        // Rose Gold / Champagne palette
        roseGold: {
          DEFAULT: "#C9A574",
          light: "#D4AF87",
          dark: "#A88346",
        },
        // Blush Rose palette
        blush: {
          DEFAULT: "#D89A94",
          light: "#E0ABA6",
          dark: "#B87F78",
        },
        // Warm Ivory palette
        ivory: {
          DEFAULT: "#FAF7F2",
          card: "#FAF7F2",
          muted: "#F3EEE7",
          cream: "#F5F0E8",
        },
        charcoal: {
          DEFAULT: "#1C2544",
          light: "#3A4568",
          muted: "#6B7694",
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
