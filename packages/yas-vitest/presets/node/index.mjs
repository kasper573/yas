import { defineConfig as defineConfigImpl, mergeConfig } from "vitest/config";

/**
 * @param {import("vitest/config").UserWorkspaceConfig} options
 */
export function defineConfig(options = {}) {
  /**
   * @type {import("vitest/config").UserWorkspaceConfig}
   */
  const baseOptions = {
    test: {
      globals: true,
      include: ["**/__test__/**/*.test.{js,jsx,ts,tsx}"]
    },
  };
  return defineConfigImpl(mergeConfig(baseOptions, options));
}
