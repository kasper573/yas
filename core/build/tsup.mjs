import * as fs from "fs";
import * as path from "path";
import { defineConfig as defineTsupConfig } from "tsup";
import { defineEnv } from "./defineEnv.mjs";

/**
 * @param {string} projectRoot
 * @param {import("tsup").Options} options
 */
export function defineConfig(projectRoot, options) {
  return defineTsupConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    define: defineEnv(projectRoot),
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
