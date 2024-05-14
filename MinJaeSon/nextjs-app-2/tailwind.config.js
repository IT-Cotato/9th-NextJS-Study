/** @type {import('tailwindcss').Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_2000 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_2000,
      minHeight: px0_2000,
      width: px0_2000,
      height: px0_2000,
      spacing: px0_200,
      padding: px0_1000,
      margin: px0_1000,
      borderWidth: px0_10,
      borderRadius: px0_100,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-out": "fade-out 1s ease forwards",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
