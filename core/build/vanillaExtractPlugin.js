const esbuild = require("@vanilla-extract/esbuild-plugin");
const vite = require("@vanilla-extract/vite-plugin");
const { absoluteFilePlugin } = require("esbuild-absolute-file-plugin");

const filter = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|woff2?|ttf)$/;

// Vanilla Extract almost works entirely out of the box,
// but needs to be configured per bundler to instruct it how to handle assets,
// so we have a few different functions to configure it for each bundler.

function viteVanillaExtractPlugin() {
  return vite.vanillaExtractPlugin({
    esbuildOptions: { plugins: [absoluteFilePlugin({ filter })] },
  });
}

function esbuildVanillaExtractPlugin() {
  return esbuild.vanillaExtractPlugin({
    esbuildOptions: { plugins: [absoluteFilePlugin({ filter })] },
  });
}

module.exports = { viteVanillaExtractPlugin, esbuildVanillaExtractPlugin };
