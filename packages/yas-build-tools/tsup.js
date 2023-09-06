// @ts-check

const { defineConfig } = require("tsup");
const { defineEnv } = require("./defineEnv");

/**
 * @param {string} projectRoot
 * @param {Partial<import("packages/yas-build-tools/tsup").Options>} options
 */
function createYasTsupConfig(projectRoot, options) {
  const define = defineEnv(projectRoot);
  console.log("define:");
  for (const key in define) {
    console.log(`  ${key}: ${define[key]}`);
  }
  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: [/^@yas\//],
    define,
    ...options,
  });
}

module.exports = { createYasTsupConfig };
