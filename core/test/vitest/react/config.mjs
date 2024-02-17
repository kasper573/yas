// @ts-check

import * as path from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { defineConfig as defineConfigNode } from "../node/config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {string} projectDir
 * @param {import("vitest/config").UserWorkspaceConfig} options
 */
export function defineConfig(projectDir, options = {}) {
  /**
   * @type {import("vitest/config").UserWorkspaceConfig}
   */
  const nodeOptions = {
    plugins: [react()],
    test: {
      environment: "jsdom",
    },
  };

  return defineConfigNode(projectDir, mergeConfig(nodeOptions, options));
}
