const path = require("path");

/**
 * Transforms files matching the given filter to urls relative to the project root.
 * Takes monorepo structures into consideration.
 * Intended to be used in combination with css url() statements.
 */
function fileUrlPlugin({ filter = defaultFileFilter }) {
  /**
   * @type {import("esbuild").Plugin}
   */
  const config = {
    name: "esbuild-file-plugin",
    setup({ onLoad, initialOptions: { absWorkingDir } }) {
      onLoad({ filter }, async (args) => {
        const url = await translatePath(
          path.normalize(args.path),
          path.normalize(absWorkingDir),
        );
        return {
          contents: `export default ${JSON.stringify(url)};`,
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
  const fileUrl = path.relative(workingDir, filePath).replaceAll(/\\/g, "/");
  if (!packageJsonPath) {
    // File is not inside a package. Use path as-is.
    return `/${fileUrl}`;
  }

  const packagePath = path.dirname(packageJsonPath);
  if (packagePath === workingDir) {
    // File is in current package. Use path as-is.
    return `/${fileUrl}`;
  }

  // File is in another package. Prefix to load through the correct package in node_modules.
  const packageName = require(packageJsonPath).name;
  const packageRelativeFilePath = path.relative(packagePath, filePath);
  const packageRelativeUrl = packageRelativeFilePath.replaceAll(/\\/g, "/");
  const translatedPath = `/node_modules/${packageName}/${packageRelativeUrl}`;
  return translatedPath;
}

module.exports = { fileUrlPlugin };
