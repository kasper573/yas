#!/usr/bin/env tsx

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { loadWorkspaces } from "../src/workspace";

async function run(packageNames: string[]): Promise<number> {
  const deps = new Map<PackageName, Set<Version>>();
  const dependents = new Map<DependencyId, Set<PackageName>>();
  for (const workspace of loadWorkspaces(process.cwd())) {
    for (const pkg of workspace.packages) {
      for (const dependencKind of [
        "dependencies",
        "peerDependencies",
        "devDependencies",
      ] as const) {
        const dependencies = pkg[dependencKind];
        for (const [dependencyName, dependencyVersion] of Object.entries(
          dependencies,
        )) {
          if (!packageNames.includes(dependencyName)) {
            continue;
          }
          const versions = getOrDefine(deps, dependencyName, new Set());
          const dependentsForVersion = getOrDefine(
            dependents,
            createDependencyId(dependencyName, dependencyVersion),
            new Set(),
          );
          versions.add(dependencyVersion);
          dependentsForVersion.add(pkg.name);
        }
      }
    }
  }

  const errors: string[] = [];
  for (const [dependencyName, versions] of deps.entries()) {
    if (versions.size > 1) {
      errors.push(
        `${dependencyName}\n${Array.from(versions)
          .map(
            (version) =>
              `  ${version}\n${listDependents(dependencyName, version)}`,
          )
          .join("\n")}`,
      );
    }
  }

  function listDependents(dependencyName: string, version: string) {
    const dependentsForVersion = Array.from(
      dependents.get(createDependencyId(dependencyName, version)) ?? [],
    );
    return "    " + dependentsForVersion.join("\n    ");
  }

  if (errors.length) {
    console.error(`❌  Duplicate package versions found:`);
    console.error(errors.join("\n"));
    return 1;
  }

  console.log(
    `✅  All workspaces use the same versions of these dependencies: ${packageNames.join(
      ", ",
    )}`,
  );
  return 0;
}

type DependencyId = `${string}-${string}`;
function createDependencyId(name: string, version: string): DependencyId {
  return `${name}-${version}`;
}

function getOrDefine<K, V>(set: Map<K, V>, key: K, defaultValue: V): V {
  if (!set.has(key)) {
    set.set(key, defaultValue);
    return defaultValue;
  }
  return set.get(key) ?? defaultValue;
}

const args = yargs(hideBin(process.argv))
  .usage(
    "Makes sure all packages in the repository depend on the same versions of the given dependencies",
  )
  .options({
    packageNames: {
      type: "string",
      array: true,
      alias: "pn",
      demandOption: true,
    },
  })
  .parseSync();

run(args.packageNames).then(process.exit);

type Version = string;
type PackageName = string;
