const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

function configureDocusaurusWebpackConfig({ plugins, optimization }) {
  plugins.push(new VanillaExtractPlugin());

  // Remove css minification because In Docusaurus the CSS minimizer crashes:
  // [ERROR] Client bundle compiled with errors therefore further build is impossible.
  // assets/css/styles.4f6fd1d6.css from Css Minimizer plugin
  // Error: Call retries were exceeded
  optimization.minimizer = optimization.minimizer?.filter(
    (plugin) => plugin.constructor.name !== "CssMinimizerPlugin",
  );
}

module.exports = { configureDocusaurusWebpackConfig };
