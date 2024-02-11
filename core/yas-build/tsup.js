const path = require("path");
const { defineConfig } = require("tsup");
const { defineEnv } = require("./defineEnv");

/**
 * @param {string} projectRoot
 * @param {Partial<import("tsup").Options>} options
 */
function createYasTsupConfig(projectRoot = process.cwd(), options = {}) {
  const { internalPackages, entry } = analyzePackage(projectRoot);
  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: internalPackages,
    define: defineEnv(projectRoot),
    esbuildOptions(options) {
      options.logOverride = {
        // We sometimes intentionally define NODE_ENV as undefined to allow the runtime to fall back to a default.
        // esbuild has a built-in warning to help people to avoid this as it's usually a mistake. We're not making a mistake.
        "suspicious-define": "silent",
      };
    },
    entry,
    ...options,
  });
}

/**
 * @param {string} projectRoot
 * @returns {{internalPackages: string[], entry: { [bundleName: string]: string }}
 */
function analyzePackage(projectRoot) {
  const packageJson = require(`${projectRoot}/package.json`);

  // Derive internal packages from dependency fields
  const internalPackages = [];
  const { dependencies, devDependencies, peerDependencies } = packageJson;
  for (const deps of [dependencies, devDependencies, peerDependencies]) {
    for (const [packageName, packageVersion] of Object.entries(deps ?? {})) {
      if (
        packageVersion.startsWith("workspace:") &&
        !internalPackages.includes(packageName)
      ) {
        internalPackages.push(packageName);
      }
    }
  }

  // Derive entry points from exports field.
  const entry = {};
  const { exports = {} } = packageJson;
  for (const [exportKey, exportPaths] of Object.entries(exports)) {
    const bundleName =
      exportKey === "." ? "index" : exportKey.replace(/^\.\//, "");
    entry[bundleName] = path.resolve(
      projectRoot,
      exportPaths.import ?? exportPaths.require,
    );
  }

  return { internalPackages, entry };
}

module.exports = { createYasTsupConfig };
