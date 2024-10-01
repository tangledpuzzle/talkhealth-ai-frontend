import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  layers: {
    "no-tailwindcss": {
      // Add any styles you want to disable here
      ".no-tailwindcss": {
        all: "unset",
      },
    },
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        fit: 'fit-content',
      },
      screens: {
        "2xl": "1360px",
        xxl: "1540px",
        "2xxl": "2000px",
        "3xxl": "2500px",
        xs: "340px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          green: "#50B887",
          violet: "#2D2D3E",
          foreground: "hsl(var(--primary-foreground))",
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
        brand: {
          main: "#21AFDC",
          black: "#212131",
          grey: "#EDEDED",
          darkblue: "#212131",
          lightblue: "#F4F9FF",
          blue: "#D2EBF3",
          lightgrey: "#999999",
        },
        footer: "#2D2D3E",
        "gpt-outline":"#50B887",
        "hiw-bg": "#2D2D3EE5",
        "gpt-green-dark": "#082630",
        "gpt-blue": "#57A3BC",
        "gpt-green-light": "#A4CCB9",
        "gpt-subtle": "#F4F4F4",
        "gpt-grey": "#8DAEB9",
        "gpt-sider":"#212131"
        // "primary": "#57a3bc",
      },
      backgroundImage: {
        "brand-main-gradient":
          "linear-gradient(258.27deg, #EBF5FC 28.91%, rgba(237, 246, 253, 0) 93.24%)",
        "how-it-works-bg": 'url("/how-it-works-bg.webp")',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // add required value here
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),require("tailwindcss-animate")],
  
};

export default config;
