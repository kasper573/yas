import { loadEnv } from "@yas/env/utils.mjs";

/**
 * @param {string} projectRoot
 */
export function defineEnv(projectRoot) {
  return loadEnv(projectRoot, (key, value) => [
    `process.env.${key}`,
    value === undefined ? "undefined" : JSON.stringify(value),
  ]);
}
