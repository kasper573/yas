const { defineConfig } = require("tsup");
const { defineEnv } = require("./defineEnv");
const { esbuildVanillaExtractPlugin } = require("./vanillaExtractPlugin");

/**
 * @param {string} projectRoot
 * @param {Partial<import("tsup").Options>} options
 */
function createYasTsupConfig(projectRoot, options) {
  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: internalPackages(projectRoot),
    define: defineEnv(projectRoot),
    esbuildPlugins: [esbuildVanillaExtractPlugin()],
    esbuildOptions(options) {
      options.logOverride = {
        // We sometimes intentionally define NODE_ENV as undefined to allow the runtime to fall back to a default.
        // esbuild has a built-in warning to help people to avoid this as it's usually a mistake. We're not making a mistake.
        "suspicious-define": "silent",
      };
    },
    ...options,
  });
}

/**
 * @param {string} projectRoot
 * @returns {string[]}
 */
function internalPackages(projectRoot) {
  const packageNames = [];
  const packageJson = require(`${projectRoot}/package.json`);
  const { dependencies, devDependencies, peerDependencies } = packageJson;
  for (const deps of [dependencies, devDependencies, peerDependencies]) {
    for (const [packageName, packageVersion] of Object.entries(deps ?? {})) {
      if (
        packageVersion.startsWith("workspace:") &&
        !packageNames.includes(packageName)
      ) {
        packageNames.push(packageName);
      }
    }
  }
  return packageNames;
}

module.exports = { createYasTsupConfig };
