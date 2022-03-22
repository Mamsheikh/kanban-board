module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // screens: {
    //   xxl: { max: '1600px' },
    //   // => @media (max-width: 1535px) { ... }
    // },
    extend: {
      screens: {
        xxl: '1600px',
        xxxl: '2000px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
