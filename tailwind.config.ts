import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const customUI = plugin(({ matchUtilities, addComponents }) => {
  // .fs-[18px] => font-size: 18px; line-height: 1.5
  matchUtilities(
    {
      fs: (value: string) => ({
        fontSize: value,
        lineHeight: "1.5",
      }),
    },
    { supportsNegativeValues: false }
  );

  // .fs-fluid-18-24 => fluid font-size between 18px → 24px
  matchUtilities(
    {
      "fs-fluid": (value: string) => {
        const [minStr, maxStr] = String(value).split("-");
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        if (Number.isNaN(min) || Number.isNaN(max)) return null; // <-- fix: return null

        const minVW = 320;
        const maxVW = 1280;
        const slope = ((max - min) / (maxVW - minVW)) * 100;
        const intercept = min - (slope * minVW) / 100;

        return {
          fontSize: `clamp(${min}px, calc(${slope.toFixed(
            6
          )}vw + ${intercept.toFixed(6)}px), ${max}px)`,
          lineHeight: "1.5",
        };
      },
    },
    { supportsNegativeValues: false }
  );

  // Components (merge all @screen keys once)
  addComponents({
    // Typography
    ".heading1": {
      fontSize: `clamp(24px, calc(2.083333vw + 17.333333px), 48px)`,
      lineHeight: "1.5",
      fontWeight: "600",
      letterSpacing: "-0.01em",
    },
    ".heading2": {
      fontSize: `clamp(20px, calc(1.1vw + 11px), 32px)`,
      lineHeight: "1.5",
      color: "black",
      paddingBottom: "0.5rem",
      "@media (min-width: 768px)": {
        paddingBottom: "1rem",
      },
    },
    ".heading3": {
       fontSize: `clamp(16px, calc(0.416667vw + 14.333333px), 18px)`,
  lineHeight: "1.5",
  color: "hsl(var(--foreground))",
  paddingBottom: "0.25rem",
  "@media (min-width: 768px)": {
    paddingBottom: "1rem", 
  },
  
    },
    
    ".paragraph": {
      /* ↓ reduced from 16–18px to 14–16px */
      fontSize: `clamp(14px, calc(0.208333vw + 13.333333px), 16px)`,
      lineHeight: "1.5",
      maxWidth: "65ch",
      color: "#000000B3", // black/70
    },

    // Section
    ".section": {
      backgroundColor: "var(--section-bg, #F6F7F9)", // default bg, overridable
      color: "hsl(var(--card-foreground))",
    },
    ".section-container": {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "72rem" /* 6xl */,
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingTop: "2.5rem",
      paddingBottom: "2.5rem",
    },

    // Card
    ".card": {
      backgroundColor: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "0.5rem",
    },
    ".card-padding": {
      padding: "1rem",
    },

    // Primary Button
    ".btn-primary": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "0.5rem",
      backgroundColor: "black",
      color: "white",
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      fontSize: `clamp(14px, calc(0.104167vw + 13.666667px), 16px)`,
      lineHeight: "1.5",
      border: "1px solid transparent",
      transitionProperty: "all",
      transitionDuration: "150ms",
    },
    ".btn-primary:hover": {
      backgroundColor: "#F6F7F9",
      color: "#000000",
      borderColor: "#000000",
    },
    ".btn-primary:focus": {
      outline: "2px solid #000000",
      outlineOffset: "2px",
    },

    // --- Single @screen blocks (no duplicates) ---
    "@screen sm": {
      ".section-container": {
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingTop: "3.5rem",
        paddingBottom: "3.5rem",
      },
      ".card-padding": { padding: "1.5rem" },
    },
    "@screen md": {
      ".section-container": {
        paddingTop: "4rem",
        paddingBottom: "4rem",
      },
    },
    "@screen lg": {
      ".section-container": {
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      },
      ".card-padding": { padding: "2rem" },
    },
  });
});

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F6F7F9", // default bg
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FFDC38", // your primary
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), customUI],
};

export default config;
