import * as path from "path";
import * as fs from "fs";
import type { ZodType } from "@yas/validate";
import { z } from "@yas/validate";

export function loadWorkspaces(rootDir: string) {
  const { workspaceNames } = readPackage(rootDir);
  return workspaceNames.map((name) => loadWorkspace(rootDir, name));
}

export function loadWorkspace(rootDir: string, name: string) {
  const workspaceDir = path.resolve(rootDir, name);
  const packages = mapDirectories(workspaceDir, readPackage);
  return { name, packages };
}

export function readPackage(packageDir: string) {
  const pkg = readJSONFile(
    path.join(packageDir, "package.json"),
    packageSchema,
  );
  return {
    name: pkg.name,
    uniqueDependencyNames: new Set([
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ]),
    dependencies: pkg.dependencies ?? {},
    peerDependencies: pkg.peerDependencies ?? {},
    devDependencies: pkg.devDependencies ?? {},
    workspaceNames: pkg.workspaces.map((pattern) => pattern.replace("/*", "")),
  };
}

const packageSchema = z.object({
  name: z.string(),
  workspaces: z.string().array().default([]),
  dependencies: z.record(z.string()).optional(),
  peerDependencies: z.record(z.string()).optional(),
  devDependencies: z.record(z.string()).optional(),
});

function mapDirectories<T>(atPath: string, map: (name: string) => T): T[] {
  return fs
    .readdirSync(atPath, { withFileTypes: true })
    .reduce((list, file) => {
      if (file.isDirectory()) {
        list.push(map(path.resolve(atPath, file.name)));
      }
      return list;
    }, [] as T[]);
}

function readJSONFile<T extends ZodType>(
  filename: string,
  schema: T,
): z.infer<T> {
  return schema.parse(JSON.parse(fs.readFileSync(filename, "utf-8")));
}
