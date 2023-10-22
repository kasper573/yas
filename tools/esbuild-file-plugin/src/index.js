const path = require("path");
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

/**
 * Basically the esbuild file loader, but as a plugin.
 * Useful when the file loader can't be used.
 */
function filePlugin({ filter = defaultFileFilter } = {}) {
  /**
   * @type {import("esbuild").Plugin}
   */
  const config = {
    name: "esbuild-file-plugin",
    setup(build) {
      build.onLoad({ filter }, async (args) => {
        const nPath = path.normalize(args.path);
        const nWorkingDir = path.normalize(build.initialOptions.absWorkingDir);
        const relativePath = path.relative(nWorkingDir, nPath);
        const relativeUrl = await translatePath(
          relativePath.replace(/\\/g, "/"),
          nWorkingDir,
        );

        return {
          contents: `export default ${JSON.stringify(relativeUrl)};`,
          loader: "js",
        };
      });
    },
  };

  return config;
}

async function translatePath(filePath, workingDir) {
  const { pkgUp } = await import("pkg-up");
  const packageJsonPath = await pkgUp({ cwd: path.dirname(filePath) });
  if (!packageJsonPath) {
    // Files outside a package cannot be translated. Just pray that the path is correct.
    return filePath;
  }

  const packagePath = path.dirname(packageJsonPath);
  if (packagePath === workingDir) {
    // We don't need to translate imports referring to files in the current package
    return filePath;
  }

  // Translate the path to a URL relative to the package root
  const packageName = require(packageJsonPath).name;
  const packageRelativeFilePath = path.relative(packagePath, filePath);
  const packageRelativeUrl = packageRelativeFilePath.replace(/\\/g, "/");
  const translatedPath = `node_modules/${packageName}/${packageRelativeUrl}`;
  return translatedPath;
}

module.exports = {
  dataUrlFilePlugin,
  filePlugin,
};
