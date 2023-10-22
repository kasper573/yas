const esbuild = require("@vanilla-extract/esbuild-plugin");
const vite = require("@vanilla-extract/vite-plugin");
const { filePlugin } = require("esbuild-file-plugin");

// Vanilla Extract almost works entirely out of the box,
// but needs to be configured per bundler to instruct it how to handle assets,
// so we have a few different functions to configure it for each bundler.

function viteVanillaExtractPlugin() {
  return vite.vanillaExtractPlugin({
    esbuildOptions: esbuildOptionsWithAssetLoaders(),
  });
}

function esbuildVanillaExtractPlugin() {
  return esbuild.vanillaExtractPlugin({
    esbuildOptions: esbuildOptionsWithAssetLoaders(),
  });
}

function esbuildOptionsWithAssetLoaders() {
  return {
    plugins: [filePlugin()],
  };
}

module.exports = { viteVanillaExtractPlugin, esbuildVanillaExtractPlugin };
