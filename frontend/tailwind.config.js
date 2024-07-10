/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F33863",
          secondary: "#EAEAEA",
          accent: "#7D153A",
          neutral: "#CECECE",
        },
      },
    ],
  },
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
      },
    },
  },
  plugins: [require("daisyui")],
};
