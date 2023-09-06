const { loadEnv } = require("@yas/env/utils");

/**
 * @param {string} projectRoot
 */
function defineEnv(projectRoot) {
  return loadEnv(projectRoot, (key, value) => [
    `process.env.${key}`,
    value === undefined ? `"undefined"` : JSON.stringify(value),
  ]);
}

module.exports = { defineEnv };
