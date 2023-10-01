const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function configureDocusaurusWebpackConfig({ plugins, optimization }) {
  plugins.push(new VanillaExtractPlugin());

  // Update to latest version of css minifier because 4.2.2 and down crashes:
  // [ERROR] Client bundle compiled with errors therefore further build is impossible.
  // assets/css/styles.4f6fd1d6.css from Css Minimizer plugin
  // Error: Call retries were exceeded
  optimization.minimizer?.forEach((plugin, index) => {
    if (plugin.constructor.name === CssMinimizerPlugin.name) {
      console.log("Replacing CssMinimizerPlugin with new version");
      optimization.minimizer[index] = new CssMinimizerPlugin();
    }
  });
}

module.exports = { configureDocusaurusWebpackConfig };
