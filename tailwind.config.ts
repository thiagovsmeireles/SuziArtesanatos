import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: "#f4b6c2",
          purple: "#9b5de5",
          yellow: "#f9c74f",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;