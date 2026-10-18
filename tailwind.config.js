/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { ink: "#0f172a", mist: "#f4f6fb" },
      fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
