/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        line: '#e5e9ef',
        headline: '#13141a',
        content: '#4B4D59'
      }
    }
  },
  plugins: []
};
