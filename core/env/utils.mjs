// @ts-check

import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const validEnvFiles = JSON.parse(
  fs.readFileSync(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "validEnvFiles.json",
    ),
    "utf-8",
  ),
);

/**
 * @param {string} projectRoot
 * @returns {string | undefined}
 */
export function getEnvFile(projectRoot) {
  for (const projectRelativeEnvFile of validEnvFiles) {
    const filepath = path.resolve(projectRoot, projectRelativeEnvFile);
    if (fs.existsSync(filepath)) {
      return filepath;
    }
  }
}

/**
 * @param {string} projectRoot
 * @param {((key: string, value: unknown) => [string, unknown]) | undefined} transform
 * @returns {Record<string, unknown>}
 */
export function loadEnv(projectRoot, transform = (key, value) => [key, value]) {
  const { env } = process;
  /**
   * @type {Record<string, unknown>}
   */
  const loaded = {};
  for (const name of getReferencesInEnvFile(getEnvFile(projectRoot))) {
    const [key, value] = transform(name, env[name]);
    loaded[key] = value;
  }
  return loaded;
}

/**
 * @param {string|undefined} envFile
 * @returns {string[]}
 */
export function getReferencesInEnvFile(envFile) {
  if (!envFile) {
    return [];
  }
  const fileContent = fs.readFileSync(envFile, "utf-8");
  const references = fileContent.matchAll(/process\.env\.([A-Z_]+)/g);
  return Array.from(references).map((match) => match[1]);
}

/**
 * @param {string|undefined} envFile
 * @returns {{valid: false, error: unknown}|{valid: true, module: unknown}|undefined}
 */
export function validateEnv(envFile) {
  if (envFile) {
    try {
      // Import env file to validate the env var values.
      // Our convention is to parse and throw errors when invalid.
      // path.relative(__dirname, envFile)
      const module = require(envFile);
      return { valid: true, module };
    } catch (error) {
      return { valid: false, error };
    }
  }
}
