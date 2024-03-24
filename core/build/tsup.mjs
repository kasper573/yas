import * as fs from "fs";
import { defineConfig } from "tsup";
import { defineEnv } from "./defineEnv.mjs";

/**
 * @param {Partial<import("tsup").Options>} options
 */
export function createYasTsupConfig(options = {}) {
  if (!options.entry) {
    throw new Error("tsup entry must be manually defined");
  }

  const projectRoot = process.cwd();
  const internalPackages = deriveInternalPackages(projectRoot);
  return defineConfig({
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    noExternal: internalPackages,
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

/**
 * @param {string} projectRoot
 * @returns {string[]}
 */
function deriveInternalPackages(projectRoot) {
  const packageJson = JSON.parse(
    fs.readFileSync(`${projectRoot}/package.json`, "utf-8"),
  );

  // Derive internal packages from dependency fields
  const internalPackages = [];
  const { dependencies, devDependencies, peerDependencies } = packageJson;
  for (const deps of [dependencies, devDependencies, peerDependencies]) {
    for (const [packageName, packageVersion] of Object.entries(deps ?? {})) {
      if (
        packageVersion.startsWith("workspace:") &&
        !internalPackages.includes(packageName)
      ) {
        internalPackages.push(packageName);
      }
    }
  }

  return internalPackages;
}
