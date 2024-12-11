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
        'dairy': '#d7c687',
        'meat': '#ec857f',
        'fruits': '#28ae71',
        'vegetables': '#94bd54',
        'bakery': '#da9660',
      }
    },
  },
  plugins: [],
}

