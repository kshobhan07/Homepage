import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050b18",
          soft: "#0a1428",
          raised: "#101d38",
          line: "rgba(255,255,255,.08)",
        },
        paper: {
          DEFAULT: "#f4f7fc",
          ink: "#0b1b33",
        },
        kpmg: "#00338d",
        signal: {
          blue: "#1e6feb",
          teal: "#22d3ee",
          amber: "#f2a93b",
          red: "#e23a4e",
          indigo: "#1552c4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-condensed)", "var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        instrument: "0 30px 100px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04)",
        glow: "0 0 50px rgba(30,111,235,.16)",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "signal-drift": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-200" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        "signal-drift": "signal-drift 6s ease-in-out infinite",
        "dash-flow": "dash-flow 8s linear infinite",
        blink: "blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
