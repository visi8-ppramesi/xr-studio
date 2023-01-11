/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      minHeight: {
        900: "900px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
