import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
  plugins: [daisyui],
  daisyui: {
    themes: false, // desativa temas automáticos se quiser
  },
};

export default config;
