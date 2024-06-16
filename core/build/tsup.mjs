import * as fs from "fs";
import { defineConfig as defineTsupConfig } from "tsup";

/**
 * @param {import("tsup").Options} options
 */
export function defineConfig(options) {
  return defineTsupConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    ...options
  });
}
