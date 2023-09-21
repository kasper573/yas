// @ts-check

import * as path from "path";
import { mergeConfig } from "vitest/config";
import { defineConfig as defineConfigNode } from "../node/index.mjs";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {string} projectDir
 * @param {import("vitest/config").UserWorkspaceConfig} options
 */
export function defineConfig(projectDir = process.cwd(), options = {}) {
  /**
   * @type {import("vitest/config").UserWorkspaceConfig}
   */
  const nodeOptions = {
    plugins: [react()],
    test: {
      environment: "jsdom",
      setupFiles: path.resolve(__dirname, "setup.mjs"),
    },
  };

  return defineConfigNode(projectDir, mergeConfig(nodeOptions, options));
}
