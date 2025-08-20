/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'korean': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}