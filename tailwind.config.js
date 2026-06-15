/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        gold: {
          DEFAULT: "#d4a843",
          dark: "#b8860b",
        },
        surface: "#1a0a2e",
        bg: "#0d0618",
        light: "#f8f0e3",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
