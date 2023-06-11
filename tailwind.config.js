/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'custom-white': ' rgba(0, 0, 0, 0.3)',
    },},
  },
  plugins: [],
}