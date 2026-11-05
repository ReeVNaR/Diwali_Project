/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        festive: {
          bg: "#080A12",
          surface: "#111522",
          card: "rgba(255, 255, 255, 0.05)",
          glass: "rgba(255, 255, 255, 0.07)",
          glassBorder: "rgba(255, 255, 255, 0.14)",
          gold: "#F5B942",
          goldLight: "#FDE68A",
          goldDark: "#D97706",
          orange: "#FF7043",
          crimson: "#E11D48",
          amber: "#F59E0B",
          textPrimary: "#FFFFFF",
          textSecondary: "#A1A1AA",
          textMuted: "#71717A"
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
        'liquid-sm': '16px'
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(245, 185, 66, 0.15), 0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'gold-glow': '0 0 25px rgba(245, 185, 66, 0.35)',
        'gold-glow-lg': '0 0 50px rgba(245, 185, 66, 0.45)',
        'card-glow': '0 0 30px rgba(255, 112, 67, 0.2)'
      },
      backdropBlur: {
        'glass': '16px',
        'glass-heavy': '24px'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(245,185,66,0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(245,185,66,0.8))' }
        }
      }
    },
  },
  plugins: [],
};
