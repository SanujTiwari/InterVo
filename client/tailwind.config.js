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
          50: '#eef2ff',
          100: '#dce4ff',
          200: '#b9c9ff',
          300: '#8ba3ff',
          400: '#5c7cff',
          500: '#3b5bdb',
          600: '#2b44a8',
          700: '#1e3175',
          800: '#111d42',
          900: '#0a0f1e',
          950: '#050a14',
        },
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'gradient-accent-hover': 'linear-gradient(135deg, #2563eb, #7c3aed)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b, #ec4899)',
        'gradient-cool': 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        'gradient-success': 'linear-gradient(135deg, #10b981, #06b6d4)',
        'hero-pattern': 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-accent': '0 0 30px rgba(59, 130, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.2)',
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
