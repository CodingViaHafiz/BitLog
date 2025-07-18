/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        headingText: "#9f6257",
        fontText: "#794a42",
        fontColor: "#317BAF",
        fontblue: "#6366F1",
        hoverColor: "#2563EB", // <- just the color code
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
