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
        // Colors for text, maintain contrast with white background
        'dairy-dark': '#256153',
        'meat-dark': '#a34239',
        'fruits-dark': '#12663d',
        'vegetables-dark': '#4e5c21',
        'bakery-dark': '#784c1d',

        // Colors for background, maintain contrast with black text
        'dairy': '#6fd6be',
        'meat': '#ec857f',
        'fruits': '#28ae71',
        'vegetables': '#94bd54',
        'bakery': '#da9660',
      }
    },
  },
  plugins: [],
}

