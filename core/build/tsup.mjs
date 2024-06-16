import * as fs from "fs";
import { defineConfig as defineTsupConfig } from "tsup";
/** @import { Options } from "tsup" */

/**
 * @typedef YasTsupConfig
 * @type  {object}
 * @property {Exclude<Options["entry"], undefined>} entry
 */

/**
 * @param {YasTsupConfig} options
 */
export function defineConfig(options) {
  const { entry } = options;
  return defineTsupConfig({
    entry,
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
  });
}
