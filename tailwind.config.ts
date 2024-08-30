import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      colors: {
        primary1: "#FCC050",
        primary2: "#F9A43A",
        primaryText: "#2A2C41",
        dark1: "#171D1B",
        light1: "#F9F9F9",
        lightgray: "#F2F2F2",
        lightgray2: "#B4BDCE",
        gray1: "#D0DAEE",
        gray2: "#5B6E95",
        red: "#FE0000",
        green: "#44C979",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
