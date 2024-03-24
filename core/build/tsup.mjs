import glob from "tiny-glob";
import * as fs from "fs";
import * as path from "path";
import { defineConfig } from "tsup";
import { defineEnv } from "./defineEnv.mjs";

/**
 * @param {Partial<import("tsup").Options>} options
 */
export function createYasTsupConfig({ entry, ...rest } = {}) {
  const projectRoot = process.cwd();
  const internalPackages = deriveInternalPackages(projectRoot);
  return defineConfig(async () => ({
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
    entry: entry ?? (await deriveEntry(projectRoot)),
    ...rest,
  }));
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

/**
 * @param {string} cwd
 * @returns {Promise<Record<string, string>>}
 */
async function deriveEntry(cwd) {
  const packageJson = JSON.parse(
    await fs.promises.readFile(`${cwd}/package.json`, "utf-8"),
  );

  const entry = {};
  for (const key of Object.keys(packageJson.exports ?? {})) {
    if (key === ".") {
      const files = await glob("./src/index.*", { cwd });
      if (files.length !== 1) {
        throw new Error(
          `Expected exactly one entry file in src/index.* but found ${files.length}`,
        );
      }
      entry["index"] = files[0].replaceAll(/\\/g, "/");
    } else {
      const files = await glob(`./${path.posix.join("src", key)}`, { cwd });
      for (const file of files) {
        // Replace /* with matched file name
        const entryName = key.replace(
          /\/\*$/,
          "/" + path.basename(file, path.extname(file)),
        );
        entry[entryName] = file.replaceAll(/\\/g, "/");
      }
    }
  }

  return entry;
}
