// @ts-check

import * as path from "path";
import { mergeConfig } from "vitest/config";
import { defineConfig as defineConfigImpl } from "../node/index.mjs";
import { fileURLToPath } from 'url';
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {import("vitest/config").UserWorkspaceConfig} options
 */
export function defineConfig(options = {}) {
  /**
   * @type {import("vitest/config").UserWorkspaceConfig}
   */
  const baseOptions = {
    plugins: [react()],
    test: {
      environment: "jsdom",
      setupFiles: path.resolve(__dirname, "setup.mjs")
    },
  };

  return defineConfigImpl(mergeConfig(baseOptions, options));
}
