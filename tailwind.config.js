/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#f97316",
          secondary: "#fb923c",
          accent: "#ea580c",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#f97316",
          secondary: "#fb923c",
          accent: "#ea580c",
        },
      },
    ],
  },
}

