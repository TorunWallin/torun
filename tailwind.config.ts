import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TORUN. brand palette
        cream: {
          DEFAULT: "#FAF6EE",
          warm: "#F2EBDB",
        },
        pink: {
          light: "#FCE4EE",
          DEFAULT: "#F4A6CC",
          hot: "#EC4D9C",
          deep: "#D43A85",
        },
        lime: {
          DEFAULT: "#D9FF4D",
          deep: "#C5EE3A",
        },
        teal: {
          DEFAULT: "#0F4C3A",
          deep: "#0A3A2C",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          charcoal: "#2C2C2C",
          gray: "#5A5A5A",
          soft: "#E8E8E8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        "pink-stripes":
          "repeating-linear-gradient(to right, #FCE4EE 0, #FCE4EE 28px, #FFF0F7 28px, #FFF0F7 56px)",
        "pink-stripes-narrow":
          "repeating-linear-gradient(to right, #FCE4EE 0, #FCE4EE 14px, #FFF0F7 14px, #FFF0F7 28px)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        bounce_soft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-8px) rotate(3deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.92)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(4px, -6px)" },
        },
      },
      animation: {
        wiggle: "wiggle 2.5s ease-in-out infinite",
        "bounce-soft": "bounce_soft 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        twinkle: "twinkle 2.6s ease-in-out infinite",
        drift: "drift 4s ease-in-out infinite",
      },
      fontSize: {
        // Display sizes for hero/section headlines
        "display-sm": ["clamp(34px, 4.5vw, 52px)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(36px, 4.8vw, 62px)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(46px, 6.8vw, 88px)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};

export default config;
