/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f3f3f3",
          100: "#8e8e8e",
          200: "#4b4b4b",
          300: "#3d3d3d",
          400: "#2c2c2c",
          500: "#cacccf",
        },
        background: "#2c2c2c",
        highlight: "#3d3d3d",
        focus: "#1d1d1d",
      },
    },
  },
  plugins: [],
}

