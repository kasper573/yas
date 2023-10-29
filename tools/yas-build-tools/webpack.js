const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const vanillaCssFile = /\.vanilla\.css$/i;

/**
 * @param {import("webpack").Configuration} config
 */
function configureDocusaurusWebpackConfig(config) {
  const {
    plugins,
    optimization,
    module: { rules },
  } = config;

  // Make built-in css rules ignore css files output byvanilla extract
  for (const rule of rules.filter((rule) => rule.test.test(".css"))) {
    const { test } = rule;
    rule.test = (path) => test.test(path) && !vanillaCssFile.test(path);
  }

  config.module.rules.push({
    test: vanillaCssFile,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
        options: { url: false }, // Required as image imports should be handled via JS/TS import statements
      },
    ],
  });

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

/**
 *
 * @param {import("webpack").RuleSetRule} rule
 * @returns string
 */
function describeRule(rule) {
  const { test, use, loader } = rule;
  return [test.toString(), loader ?? use];
}

module.exports = { configureDocusaurusWebpackConfig };
