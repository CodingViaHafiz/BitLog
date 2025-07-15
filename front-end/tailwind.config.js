/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        headingText: "#9f6257;",
        fontText: "#794a42",
        peach: {
          50: "#fff7f0",
          100: "#fff1e5",
          200: "#ffe9d7",
          300: "#ffdfc8",
          400: "#ffd3b2",
          500: "#ffead8",
          600: "#f5c8a7",
          700: "#e0a784",
          800: "#cc8a67",
          900: "#b26e4e",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
