const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

function createYasWebpackConfig() {
  // The reason the webpack config doesn't contain as much as the other configs is because we don't use webpack from scratch.
  // If your app has full control over the build system, prefer something else, like Vite.
  // However, sometimes we need to inject our monorepo specific tooling into a 3rd party webpack based build system,
  // (like Docusaurus) which is when this config is useful.
  return {
    plugins: [new VanillaExtractPlugin()],
  };
}

module.exports = { createYasWebpackConfig };
