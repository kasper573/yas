import { defineConfig as defineConfigImpl, mergeConfig } from "vitest/config";

/**
 * @param {string} projectDir
 * @param {import("vitest/config").UserWorkspaceConfig} options
 */
export function defineConfig(projectDir, options = {}) {
  /**
   * @type {import("vitest/config").UserWorkspaceConfig}
   */
  const baseOptions = {
    test: {
      globals: false,
      include: ["**/test/**/*.test.{js,jsx,ts,tsx}"],
    },
  };
  return defineConfigImpl(mergeConfig(baseOptions, options));
}
