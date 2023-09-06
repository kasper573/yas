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
    },
  };
  return defineConfigImpl(mergeConfig(baseOptions, options));
}
