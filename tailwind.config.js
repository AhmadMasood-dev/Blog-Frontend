
const withMT = require("@material-tailwind/react/utils/withMT");


/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#edae49",
        secondary: "#e8dab2",
        accent: "#092327",
      },
      backgroundImage: {
        'bg1': "url('/src/assets/img/bg-1.jpg')",
        'bg2': "url('/src/assets/img/bg-2.jpg')",
      }
    },
  },
  plugins: [],
});
