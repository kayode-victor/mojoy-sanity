import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "brand-primary": "#1B4351", // Deep Teal (Mojoy Primary)
        "brand-accent": "#F4C542", // Golden Yellow (Accent)
        "brand-light": "#F9FAFB",  // Light Neutral
        "brand-dark": "#111827",   // Charcoal Dark
      },
      fontFamily: {
        brand:  ["Vonique 64", "sans-serif"], // Mojoy official font
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
