/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        italy: {
          green: {
            50: '#f0f9f1',
            100: '#dcede0',
            200: '#bcdcc2',
            300: '#8fc498',
            400: '#5ca56a',
            500: '#3a8a49',
            600: '#2a6e37',
            700: '#22582e',
            800: '#1d4726',
            900: '#173a20',
            950: '#0c2112',
          },
          red: {
            50: '#fdf3f2',
            100: '#fce5e3',
            200: '#facec9',
            300: '#f6ac9f',
            400: '#ed7a64',
            500: '#e0513a',
            600: '#c8391f',
            700: '#a82d18',
            800: '#872918',
            900: '#6e261a',
            950: '#3b100a',
          },
        },
      },
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slide-up 0.35s ease-out',
        'shake': 'shake 0.4s ease-in-out',
        'bounce-soft': 'bounce-soft 1.2s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-ring': 'pulse-ring 1s ease-out infinite',
      },
    },
  },
  plugins: [],
};
