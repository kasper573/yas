const esbuild = require("@vanilla-extract/esbuild-plugin");
const vite = require("@vanilla-extract/vite-plugin");
const { fileUrlPlugin } = require("esbuild-file-url-plugin");

const filter = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|woff2?)$/;

// Vanilla Extract almost works entirely out of the box,
// but needs to be configured per bundler to instruct it how to handle assets,
// so we have a few different functions to configure it for each bundler.

function viteVanillaExtractPlugin() {
  return vite.vanillaExtractPlugin({
    esbuildOptions: { plugins: [fileUrlPlugin({ filter })] },
  });
}

function esbuildVanillaExtractPlugin() {
  return esbuild.vanillaExtractPlugin({
    esbuildOptions: { plugins: [fileUrlPlugin({ filter })] },
  });
}

module.exports = { viteVanillaExtractPlugin, esbuildVanillaExtractPlugin };
