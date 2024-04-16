/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#2C3492',
      secondary: '#FFFFFF',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1920',
    },
    extend: {
      boxShadow: {
        sticky: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
});
