// @ts-check

const { defineConfig } = require("tsup");
const { loadEnv } = require("@yas/env/utils");
const { serializeValue } = require("./utils");

/**
 * @param {string} projectRoot
 * @param {Partial<import("packages/yas-build-tools/tsup").Options>} options
 */
function createYasTsupConfig(projectRoot, options) {
  const env = loadEnv(projectRoot, (key, value) => [
    key,
    serializeValue(value),
  ]);

  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: [/^@yas\//],
    env,
    ...options,
  });
}

module.exports = { createYasTsupConfig };
