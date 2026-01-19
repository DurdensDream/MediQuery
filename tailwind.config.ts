import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jungle: {
          50: "#e6f7e6",
          100: "#c4eac4",
          200: "#9bdb9b",
          300: "#6ecc6e",
          400: "#45be45",
          500: "#2da62d",
          600: "#228b22",
          700: "#1b6f1b",
          800: "#155615",
          900: "#0f3d0f"
        },
        earth: {
          50: "#f8f3ec",
          100: "#eadfcd",
          200: "#dccbb0",
          300: "#cbb48e",
          400: "#b59b6b",
          500: "#9c7f4c",
          600: "#7f6537",
          700: "#634e29",
          800: "#4a3a1f",
          900: "#322613"
        },
        canopy: {
          500: "#0b3d2e",
          700: "#072c21"
        }
      },
      backgroundImage: {
        "jungle-gradient": "linear-gradient(to bottom, #228B22, #006400)",
        "jungle-night": "linear-gradient(to bottom, #0b1f2a, #062027)"
      },
      fontFamily: {
        adventure: ["var(--font-adventure)", "'Trebuchet MS'", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        vine: "0 10px 30px rgba(2, 56, 25, 0.35)"
      },
      keyframes: {
        sway: {
          "0%, 100%": { transform: "rotate(-1deg) translateY(0)" },
          "50%": { transform: "rotate(1deg) translateY(-2px)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        sway: "sway 6s ease-in-out infinite",
        float: "float 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
