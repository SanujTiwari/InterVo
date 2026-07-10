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
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50: '#f7f6f3',
          100: '#e6e4de',
          200: '#d2cfc9',
          300: '#b4b1ab',
          400: '#8f8c85',
          500: '#6a6762',
          600: '#494642',
          700: '#333333',
          800: '#222222',
          900: '#0d0d0d',
          950: '#000000',
        },
        accent: {
          blue: '#e07a5f',
          purple: '#f2cc8f',
          cyan: '#81b29a',
          pink: '#f4f1de',
          emerald: '#81b29a',
          amber: '#f2cc8f',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #e07a5f, #f2cc8f)',
        'gradient-accent-hover': 'linear-gradient(135deg, #d4684b, #e0bc80)',
        'gradient-warm': 'linear-gradient(135deg, #f2cc8f, #e07a5f)',
        'gradient-cool': 'linear-gradient(135deg, #81b29a, #e07a5f)',
        'gradient-success': 'linear-gradient(135deg, #81b29a, #f2cc8f)',
        'hero-pattern': 'radial-gradient(circle at 20% 50%, rgba(224, 122, 95, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(242, 204, 143, 0.08) 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(224, 122, 95, 0.2)',
        'glow-purple': '0 0 20px rgba(242, 204, 143, 0.2)',
        'glow-accent': '0 0 30px rgba(224, 122, 95, 0.15), 0 0 60px rgba(242, 204, 143, 0.1)',
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
