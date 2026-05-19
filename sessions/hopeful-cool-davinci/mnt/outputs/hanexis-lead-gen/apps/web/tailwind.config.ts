import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#fafafa",
          100: "#f5f5f7",
          200: "#e8e8ec",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        accent: {
          DEFAULT: "#f5a623",
          50: "#fff7ea",
          500: "#f5a623",
          600: "#d98c0a",
        },
      },
      backdropBlur: { xs: "2px" },
      backgroundImage: {
        "glass-radial": "radial-gradient(ellipse at top left, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
        "page": "linear-gradient(180deg, #fafafa 0%, #f0f0f3 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
        "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.12)",
        "soft": "0 2px 8px 0 rgba(0,0,0,0.04)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-up": "fade-up 0.4s ease-out",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
