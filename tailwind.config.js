/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          dark: '#131921',
          light: '#232F3E',
          blue: '#146EB4',
          green: '#008296',
          'text': '#FFFFFF',
          'text-secondary': '#999999',
          'card-bg': 'rgba(35, 47, 62, 0.8)',
          'card-hover': 'rgba(35, 47, 62, 0.95)'
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 