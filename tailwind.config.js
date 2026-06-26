/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef9ff',
          100: '#c9edff',
          200: '#8bd8ff',
          400: '#38b6ff',
          500: '#0096e6',
          600: '#0077c2',
          700: '#005a99',
          800: '#003d70',
          900: '#002347',
        },
        sun: {
          400: '#ffcc00',
          500: '#f5a623',
        }
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
