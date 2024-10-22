import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      spacing: {
        pc: "90rem"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        shell: "var(--shell)",
        EWhite: "#fdfdf8",
        ERed: "#d32734",
        EOrange: "#da7d22",
        EYellow: "#e6da29",
        EGreen: "#28c641",
        EBlue: "#2d93dd",
        EPurple: "#7b53ad",
        EBlack: "#1b1c33"
      }
    }
  },
  plugins: []
};
export default config;
