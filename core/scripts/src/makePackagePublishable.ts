import * as path from "path";
import { createMutableResource } from "./createMutableResource";

/**
 * Strips internal package details from package.json before running a command.
 * Restores package.json after the command is done, but keeps the new version intact.
 */
export function makePackagePublishable(pkg: PackageJson, distFolder: string) {
  delete pkg.private;
  delete pkg.scripts;
  delete pkg.devDependencies;
  bindPackageToDistFolder(pkg, distFolder);
  return (
    handleInternalPackageDependencies(pkg, "dependencies", "error") &&
    handleInternalPackageDependencies(pkg, "peerDependencies", "error") &&
    handleInternalPackageDependencies(pkg, "devDependencies", "delete")
  );
}

export function createPackageResource(packageFolder: string) {
  return createMutableResource(
    path.resolve(packageFolder, "package.json"),
    (str) => JSON.parse(str) as PackageJson,
    (json, op) => {
      const jsonString = JSON.stringify(json, null, 2);
      return op === "restore" ? jsonString + "\n" : jsonString;
    },
  );
}

function bindPackageToDistFolder(pkg: PackageJson, distFolder: string) {
  pkg.main = `${distFolder}/index.js`;
  pkg.module = `${distFolder}/index.mjs`;
  pkg.types = `${distFolder}/index.d.ts`;
  if (pkg.exports) {
    for (const exportName of Object.keys(pkg.exports)) {
      const filename = path.posix.join(
        distFolder,
        exportName === "." ? "index" : exportName,
      );
      pkg.exports[exportName] = {
        require: `./${filename}.js`,
        import: `./${filename}.mjs`,
        types: `./${filename}.d.ts`,
      };
    }
  }
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

export interface PackageJson {
  name: string;
  version: string;
  exports?: Record<string, string | Record<string, string>>;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown;
}
