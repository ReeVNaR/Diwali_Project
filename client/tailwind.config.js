/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          bg: "#FAF7F2",
          surface: "rgba(255, 255, 255, 0.75)",
          card: "rgba(255, 255, 255, 0.65)",
          glass: "rgba(255, 255, 255, 0.7)",
          glassBorder: "rgba(255, 255, 255, 0.85)",
          gold: "#D97706",
          goldLight: "#FDE68A",
          goldDark: "#92400E",
          orange: "#EA580C",
          crimson: "#E11D48",
          amber: "#F59E0B",
          textPrimary: "#0F172A",
          textSecondary: "#475569",
          textMuted: "#94A3B8"
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'serif'],
        festive: ['Rozha One', 'Cinzel Decorative', 'serif'],
        display: ['Outfit', 'sans-serif'],
        handwriting: ['Great Vibes', 'cursive']
      },
      borderRadius: {
        'liquid': '22px',
        'liquid-lg': '28px',
        'liquid-sm': '14px'
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)',
        'glass-hover': '0 14px 40px 0 rgba(217, 119, 6, 0.15), 0 8px 25px 0 rgba(0, 0, 0, 0.06), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
        'glass-elevated': '0 16px 45px 0 rgba(148, 163, 184, 0.18), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
        'gold-glow': '0 4px 20px rgba(245, 158, 11, 0.35)',
        'gold-glow-lg': '0 8px 30px rgba(245, 158, 11, 0.45)'
      },
      backdropBlur: {
        'glass': '20px',
        'glass-heavy': '28px'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
