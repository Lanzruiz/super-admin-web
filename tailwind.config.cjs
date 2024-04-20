/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const plugin = require('tailwindcss/plugin');

module.exports = withMT({
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
      },
      colors: {
        primary: "#2C3492",

        success: "#3EBF1E",
        danger: "#EC2028",

        black: "#180202",
        white: "#FFFFFF",

        dark_gray: "#D1D6DE",
        darker_gray: "#666666",
        light_gray: "#F2F2F2",

        label_dark: "#A3D3FF",
        label_light: "#D8ECFF",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      )
    })
  ],
});
