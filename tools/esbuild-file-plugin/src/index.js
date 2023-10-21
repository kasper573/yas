const fs = require("fs");

const defaultFileFilter = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|woff2?)$/;

function dataUrlFilePlugin({ filter = defaultFileFilter } = {}) {
  /**
   * @type {import("esbuild").Plugin}
   */
  const config = {
    name: "esbuild-dataurl-file-plugin",
    setup(build) {
      build.onLoad({ filter }, async (args) => {
        return {
          contents: await fs.promises.readFile(args.path),
          loader: "dataurl",
        };
      });
    },
  };

  return config;
}

module.exports = { dataUrlFilePlugin };
