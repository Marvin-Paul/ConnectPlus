import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Design Specification Colors
        background: "#F3F6F8", // Professional Gray Background
        foreground: "#1F2937", // Text Primary
        surface: "#FFFFFF",
        
        primary: {
          DEFAULT: "#0A66C2", // LinkedIn Blue
          hover: "#004182",
        },
        secondary: {
          DEFAULT: "#6B7280", // Text Secondary
          foreground: "#FFFFFF",
        },
        border: "#E5E7EB", // Border Light Gray
        input: "#E5E7EB",
        ring: "#0A66C2",
        
        muted: {
          DEFAULT: "#F3F6F8",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#F3F6F8",
          foreground: "#1F2937",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
        premium: "0 8px 24px rgba(0,0,0,0.08)",
        dropdown: "0 12px 40px rgba(0,0,0,0.12)",
      },
      spacing: {
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "40": "40px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out forwards",
      }
    },
  },
  plugins: [],
};

export default config;
