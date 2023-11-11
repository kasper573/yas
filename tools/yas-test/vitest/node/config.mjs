import path from "path";
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
      globals: true,
      include: ["**/__test__/**/*.test.{js,jsx,ts,tsx}"],
      typecheck: {
        tsconfig: path.resolve(projectDir, "src/__test__/tsconfig.json"),
      },
    },
  };
  return defineConfigImpl(mergeConfig(baseOptions, options));
}
