// @ts-check

const { defineConfig } = require("tsup");
const { defineEnv } = require("./defineEnv");

/**
 * @param {string} projectRoot
 * @param {Partial<import("packages/yas-build-tools/tsup").Options>} options
 */
function createYasTsupConfig(projectRoot, options) {
  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: [/^@yas\//],
    define: defineEnv(projectRoot),
    ...options,
  });
}

module.exports = { createYasTsupConfig };
