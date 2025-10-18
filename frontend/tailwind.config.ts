import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Campus Dashboard custom palette and typography
      fontFamily: {
        heading: ["Poppins", "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      // Campus palette tokens (also available as css vars in index.css)
      // Use via `text-campus-primary` or `bg-campus-primary` in Tailwind utilities.
      colors: {
        campus: {
          primary: '#2F855A',
          'primary-light': '#E6F4EA',
          accent: '#3BAEA0',
          sidebar: '#F0FBF4',
          'sidebar-hover': '#D8F3E4',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          'text-primary': '#1A202C',
          'text-secondary': '#4A5568',
          'icon-muted': '#718096',
          danger: '#E53E3E',
          success: '#38A169',
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Card entrance (fade up)
        fadeUp: {
          from: { opacity: "0", transform: "translateY(15px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Sidebar subtle hover transform
        sidebarHover: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(6px)" },
        },
        // Button press feedback small scale animation
        btnPress: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.97)" },
        },
        // Page transition fade+slide
        fadeSlide: {
          from: { opacity: "0", transform: "translateY(15px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeUp: "fadeUp 0.6s ease forwards",
        sidebarHover: "sidebarHover 0.25s ease forwards",
        btnPress: "btnPress 0.12s ease-in-out",
        fadeSlide: "fadeSlide 0.5s ease",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
