import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Product Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          DEFAULT: "#BAEE52",
          50: "#FDFEF9",
          100: "#F5FDE7",
          200: "#E6F9C1",
          300: "#D8F59C",
          400: "#C9F277",
          500: "#BAEE52",
          600: "#A6E91F",
          700: "#84BD13",
          800: "#618A0E",
          900: "#3D5709",
          950: "#2B3E06",
        },
      },
    },
  },
  plugins: [],
};
