/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F33863",
        secondary: "#EAEAEA",
        background: "#FFF2F2",
        accent: "#7D153A",
        black: "#000000",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],
};
