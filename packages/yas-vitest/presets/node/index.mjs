import { defineConfig as defineConfigImpl, mergeConfig } from "vitest/config";
import path from "path";

/**
 * @param {string} projectDir
 * @param {import("vitest/config").UserWorkspaceConfig} options
 */
export function defineConfig(projectDir = process.cwd(), options = {}) {
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
