/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#4d4d4d',
          600: '#333333',
          700: '#262626',
          800: '#1a1a1a',
          900: '#0d0d0d',
          950: '#121212',
        },
        accent: {
          blue: '#d4684b',
          purple: '#e88d72',
          cyan: '#d4684b',
          pink: '#fcfaf9',
          emerald: '#34d399',
          amber: '#fbbf24',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #d4684b, #e88d72)',
        'gradient-accent-hover': 'linear-gradient(135deg, #be5b3f, #d57a60)',
        'gradient-warm': 'linear-gradient(135deg, #e88d72, #d4684b)',
        'gradient-cool': 'linear-gradient(135deg, #34d399, #d4684b)',
        'gradient-success': 'linear-gradient(135deg, #34d399, #fbbf24)',
        'hero-pattern': 'radial-gradient(circle at 20% 50%, rgba(212, 104, 75, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(232, 141, 114, 0.08) 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(212, 104, 75, 0.2)',
        'glow-purple': '0 0 20px rgba(232, 141, 114, 0.2)',
        'glow-accent': '0 0 30px rgba(212, 104, 75, 0.15), 0 0 60px rgba(232, 141, 114, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
