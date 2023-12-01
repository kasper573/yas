#!/usr/bin/env tsx

import * as path from "path";
import * as fs from "fs";
import type { ZodType } from "@yas/validate";
import { z } from "@yas/validate";
import uniqueColor from "uniqolor";
import chalk from "chalk";

const symbols = {
  rel: ">",
  or: "/",
};

const hierarchy = parseHierarchy(process.argv.slice(2).join(""));

if (!hierarchy.length) {
  console.error(
    `Usage: assert-workspace-hierarchy.ts workspaceA${symbols.or}workspaceB ${symbols.rel} workspaceC`,
  );
  process.exit(1);
}

const uniqueWorkspaceNames = Array.from(new Set(hierarchy.flat()).values());

const workspacesByName = Object.fromEntries(
  uniqueWorkspaceNames.map((name) => [
    name,
    loadWorkspace(process.cwd(), name),
  ]),
);

const errors = new Map<string, string[]>();

for (let i = 0; i < hierarchy.length; i++) {
  const workspaceGroup = hierarchy[i];
  const parentWorkspaces = hierarchy
    .slice(0, i)
    .flat()
    .map((name) => workspacesByName[name]);

  for (const workspaceName of workspaceGroup) {
    const workspace = workspacesByName[workspaceName];
    for (const pkg of workspace.packages) {
      for (const dependency of pkg.dependencies) {
        const violatingWorkspace = parentWorkspaces.find((parent) =>
          parent.packages
            .filter((p) => !pkg.depcheck.exceptions.allow.includes(p.name))
            .find(({ name }) => name === dependency),
        );
        if (!violatingWorkspace) {
          continue;
        }
        const group = `❌  Dependency hierarchy violations in ${colorize(
          workspace.name + "/" + pkg.name,
        )}:`;
        let list = errors.get(group);
        if (!list) {
          errors.set(group, (list = []));
        }
        list.push(
          `may not depend on ${colorize(dependency)} (defined in ${colorize(
            violatingWorkspace.name,
          )})`,
        );
      }
    }
  }
}

if (!errors.size) {
  console.log(
    `✅  All workspaces follow dependency hierarchy rule: ${hierarchy
      .map((group) => group.map((name) => colorize(name)).join(symbols.or))
      .join(` ${symbols.rel} `)}.`,
  );
} else {
  for (const [group, list] of errors) {
    console.error(group);
    for (const item of list) {
      console.error(`- ${item}`);
    }
  }
}

function parseHierarchy(rule: string): string[][] {
  return rule
    .split(symbols.rel)
    .map((group) => group.trim())
    .filter(Boolean)
    .map((group) =>
      group
        .split(symbols.or)
        .map((part) => part.trim())
        .filter(Boolean),
    );
}

function loadWorkspace(rootDir: string, name: string) {
  const workspaceDir = path.resolve(rootDir, name);
  const packages = fs.readdirSync(workspaceDir, { withFileTypes: true }).reduce(
    (list, file) => {
      if (file.isDirectory()) {
        list.push(readPackage(path.resolve(workspaceDir, file.name)));
      }
      return list;
    },
    [] as Array<ReturnType<typeof readPackage>>,
  );
  return { name, packages };
}

function readPackage(packageDir: string) {
  const pkg = readJSONFile(
    path.join(packageDir, "package.json"),
    z.object({
      name: z.string(),
      dependencies: z.record(z.string()).optional(),
      peerDependencies: z.record(z.string()).optional(),
      devDependencies: z.record(z.string()).optional(),
      depcheck: z
        .object({
          exceptions: z
            .object({
              allow: z.array(z.string()).default([]),
            })
            .default({}),
        })
        .default({}),
    }),
  );
  return {
    name: pkg.name,
    dependencies: new Set([
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ]),
    depcheck: pkg.depcheck,
  };
}

function readJSONFile<T extends ZodType>(
  filename: string,
  schema: T,
): z.infer<T> {
  return schema.parse(JSON.parse(fs.readFileSync(filename, "utf-8")));
}

function colorize(str: string) {
  return chalk.hex(uniqueColor(str).color)(str);
}
