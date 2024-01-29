import * as path from "path";
import type { MutableResource } from "./createMutableResource";
import { createMutableResource } from "./createMutableResource";

/**
 * Strips internal package details from package.json before running a command.
 * Restores package.json after the command is done, but keeps the new version intact.
 */
export async function publicizePackageJson({
  operation,
  distFolder,
  preview,
}: {
  operation: (pkg: MutableResource<PackageJson>) => Promise<void>;
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

    await operation(pkg);
    return 0;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.stack ?? e.message ?? e.cause ?? e.name ?? String(e));
    } else {
      console.error(`Unknown error: ${e}`);
    }
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

export interface PackageJson {
  name: string;
  version: string;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown;
}
