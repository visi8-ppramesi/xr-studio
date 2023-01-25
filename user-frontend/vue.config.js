const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
  chainWebpack: (config) => {
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false, // exclude all comments from output
      };
      return args;
    });
  },
  transpileDependencies: true,
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
});
