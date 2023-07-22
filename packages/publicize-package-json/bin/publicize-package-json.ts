#!/usr/bin/env tsx

import * as path from "path";
import { execaCommand } from "execa";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createMutableResource } from "./createMutableResource";

/**
 * Strips internal package details from package.json before running a command.
 * Restores package.json after the command is done, but keeps the new version intact.
 */
async function run({
  command,
  distFolder,
  preview,
}: {
  command: string;
  distFolder: string;
  preview?: boolean;
}) {
  const packageFolder = path.resolve(distFolder, "..");
  const packageJsonPath = path.resolve(packageFolder, "package.json");
  const relativeDistFolder = path.relative(packageFolder, distFolder);

  const pkg = createMutableResource(
    packageJsonPath,
    (str) => JSON.parse(str) as PackageJson,
    (json) => JSON.stringify(json, null, 2) + "\n",
  );

  if (preview) {
    console.log("Previewing changes to package.json:");
    makePackageReleaseReady(pkg.contents, relativeDistFolder);
    console.log(pkg.contents);
    return 0;
  }

  const ok = pkg.update((pkg) =>
    makePackageReleaseReady(pkg, relativeDistFolder),
  );

  try {
    if (!ok) {
      console.error("Failed to make package.json release ready");
      return 1;
    }

    console.log("package.json has been made release ready");

    console.log(`Running command "${command}"`);
    const { stdout } = await execaCommand(command);
    console.log(stdout);
    return 0;
  } catch (e) {
    console.error(
      `Error while running command "${command}":\n` + (e as Error).message,
    );
    return 1;
  } finally {
    pkg.reload();
    pkg.restore((original) => {
      if (original.version !== pkg.contents.version) {
        original.version = pkg.contents.version;
        console.log(
          "Retaining new package version before restoring original package.json: " +
            pkg.contents.version,
        );
      }
    });
    console.log("package.json has been restored");
  }
}

function makePackageReleaseReady(pkg: PackageJson, distFolder: string) {
  delete pkg.private;
  delete pkg.scripts;
  delete pkg.devDependencies;
  delete pkg.jest;
  bindPackageToDistFolder(pkg, distFolder);
  return (
    handleInternalPackageDependencies(pkg, "dependencies", "error") &&
    handleInternalPackageDependencies(pkg, "peerDependencies", "error") &&
    handleInternalPackageDependencies(pkg, "devDependencies", "delete")
  );
}

function bindPackageToDistFolder(pkg: PackageJson, distFolder: string) {
  pkg.main = `${distFolder}/index.js`;
  pkg.module = `${distFolder}/index.mjs`;
  pkg.types = `${distFolder}/index.d.ts`;
  pkg.exports = {
    ".": {
      require: `./${distFolder}/index.js`,
      import: `./${distFolder}/index.mjs`,
      types: `./${distFolder}/index.d.ts`,
    },
  };
  pkg.files = [distFolder, "package.json", "readme.md"];
}

function handleInternalPackageDependencies(
  pkg: PackageJson,
  prop: "dependencies" | "peerDependencies" | "devDependencies",
  action: "delete" | "error",
): boolean {
  let ok = true;
  const deps = pkg[prop] ?? {};
  for (const key in deps) {
    const value = deps[key];
    if (value.startsWith("workspace:")) {
      if (action === "error") {
        ok = false;
        console.error(
          `${prop} may not reference internal packages. Found: ${key}: ${value}`,
        );
      } else {
        delete deps[key];
      }
    }
  }
  return ok;
}

const args = yargs(hideBin(process.argv))
  .options({
    command: { type: "string", alias: "c", demandOption: true },
    distFolder: { type: "string", alias: "d", demandOption: true },
    preview: { type: "boolean", alias: "p" },
  })
  .parseSync();

run(args).then(process.exit);

type PackageJson = {
  version: string;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown;
};
