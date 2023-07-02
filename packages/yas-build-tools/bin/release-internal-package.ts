#!/usr/bin/env tsx

import * as path from "path";
import { execa } from "execa";
import { createMutableResource } from "./createMutableResource";

/**
 * Wrapper around semantic-release.
 * Strips internal package details from package.json before running semantic-release.
 * Restores package.json after semantic-release is done, but keeps the new version intact.
 */
async function run(distFolder: string = process.argv[2] ?? "dist") {
  const packageFolder = path.resolve(distFolder, "..");
  const packageJsonPath = path.resolve(packageFolder, "package.json");
  const relativeDistFolder = path.relative(packageFolder, distFolder);

  const pkg = createMutableResource(
    packageJsonPath,
    (str) => JSON.parse(str) as PackageJson,
    (json) => JSON.stringify(json, null, 2) + "\n"
  );

  pkg.update((pkg) => makePackageReleaseReady(pkg, relativeDistFolder));

  await execa("semantic-release");
  pkg.reload();

  pkg.restore((original) => (original.version = pkg.contents.version));
}

function makePackageReleaseReady(pkg: PackageJson, distFolder: string) {
  delete pkg.private;
  delete pkg.scripts;
  delete pkg.devDependencies;
  delete pkg.jest;
  bindPackageToDistFolder(pkg, distFolder);
  removeInternalPackageDependencies(pkg.dependencies);
  removeInternalPackageDependencies(pkg.peerDependencies);
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
}

function removeInternalPackageDependencies(deps: Record<string, string> = {}) {
  for (const key in deps) {
    const value = deps[key];
    if (value.startsWith("workspace:")) {
      delete deps[key];
    }
  }
}

run();

type PackageJson = {
  version: string;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown;
};
