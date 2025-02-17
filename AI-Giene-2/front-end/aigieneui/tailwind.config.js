/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      "dark-grey": "#1A1A1A",
      "light-grey": "#242424",
      "black": "#000000"
    },
    extend: {
      space: {
        '85': '40rem',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #87cae2 0%, #2987a8 100%)',
        'custom-text-gradient': 'linear-gradient(180deg, #d6d6d6 0%, #ededed 100%)',
      },
      keyframes: {
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(-200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        'fade-right': 'fadeRight 0.6s ease-out',
        'fade-left': 'fadeLeft 0.6s ease-out',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',  // IE & Edge
          'scrollbar-width': 'none',  // Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',  // Chrome, Safari, Opera
        },
      });
    }
  ],
};
