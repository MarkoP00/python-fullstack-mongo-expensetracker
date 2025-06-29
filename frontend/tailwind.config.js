/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        scaleIn: "scaleIn 0.2s ease-out",
      },
      colors: {
        background: "#1f2833",
        action: "#66fcf1",
        bgAction: "#45a29e",
        text: "#c5c6c7",
      },
      boxShadow: {
        lightBlue:
          "rgba(102, 252, 241, 0.2) 0px 0px 27px 5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
      },
    },

    plugins: [],
  },
};
