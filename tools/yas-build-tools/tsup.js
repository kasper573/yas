// @ts-check

const { defineConfig } = require("tsup");
const { vanillaExtractPlugin } = require("@vanilla-extract/esbuild-plugin");
const { defineEnv } = require("./defineEnv");

/**
 * @param {string} projectRoot
 * @param {Partial<import("tools/yas-build-tools/tsup").Options>} options
 */
function createYasTsupConfig(projectRoot, options) {
  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: [/^@yas\//],
    define: defineEnv(projectRoot),
    esbuildPlugins: [vanillaExtractPlugin()],
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

module.exports = { createYasTsupConfig };
