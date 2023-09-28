/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': { 
          100: '#fae9e6',
          200: '#fad6cf',
          300: '#fcbfb3',
          400: '#fa9b87',
          500: '#ff7d61',
          600: '#ff4e27',
          700: '#ff2d00',
        },
      }
    },
  },
  plugins: [],
}

