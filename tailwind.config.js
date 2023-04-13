module.exports = {
  content: ["./src/**/*.njk", "./src/**/*.svg", "./src/assets/js/*.js"],
  screens: {
    sm: "576px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D3748",
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#E2E8F0",
          300: "#CBD5E0",
          400: "#A0AEC0",
          500: "#718096",
          600: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
          900: "#0D131E",
        },
        secondary: {
          DEFAULT: "#718096",
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#E2E8F0",
          300: "#CBD5E0",
          400: "#A0AEC0",
          500: "#718096",
          600: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
          900: "#0D131E",
        },
        accent: {
          DEFAULT: "#4FD1C5",
          50: "#F0FCF9",
          100: "#C6F7E9",
          200: "#8EEDD1",
          300: "#5FE3C0",
          400: "#2DCCA7",
          500: "#00BFA6",
          600: "#00A99D",
          700: "#00857B",
          800: "#006358",
          900: "#003D34",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              fontWeight: "normal",
              color: theme("colors.secondary.600"),
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
