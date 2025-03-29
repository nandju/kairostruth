/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#990000',
          'light': '#cc0000',
          'dark': '#660000',
          'lighter': '#ff3333',
          'darker': '#330000',
        },
        'white': '#ffffff',
        'black': '#000000',
        'gray': {
          'light': '#f5f5f5',
          'medium': '#cccccc',
          'dark': '#333333',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'clash': ['ClashDisplay-Variable', 'sans-serif'],
        'monument': ['Monument Extended', 'sans-serif'],
        'druk': ['Druk Wide Bold', 'sans-serif']
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        'scroll-x': 'scroll-x 20s linear infinite'
      }
    },
  },
  plugins: [],
}