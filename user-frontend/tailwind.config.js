/** @type {import('tailwindcss').Config} */
console.log("asdfasdfasdfasdf");
module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
