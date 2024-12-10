/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./blog.html",
    "./index.html",
    "./src/**/*.{inc,html}",
  ],
  theme: {
    extend: {
      colors: {
        'dairy': '#fde5b1',
        'meat': '#ec857f',
        'fruits': '#91ca76',
        'vegetables': '#daef7a',
        'bakery': '#da9660',
      }
    },
  },
  plugins: [],
}

