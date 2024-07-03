import * as path from "path";
import * as fs from "fs";

export function loadWorkspaces(rootDir: string) {
  const { workspaceNames } = readPackage(rootDir);
  return workspaceNames.map((name) => loadWorkspace(rootDir, name));
}

export function loadWorkspace(rootDir: string, name: string) {
  const workspaceDir = path.resolve(rootDir, name);
  const packages = mapDirectories(workspaceDir, readPackage);
  return { name, packages };
}

export function readPackage(packageDir: string): TransformedPackage {
  const pkg = readJSONFile<PackageJSON>(path.join(packageDir, "package.json"));
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
    workspaceNames:
      pkg.workspaces?.map((pattern) => pattern.replace("/*", "")) ?? [],
  };
}

interface TransformedPackage extends Dependencies {
  name: string;
  uniqueDependencyNames: Set<string>;
  workspaceNames: string[];
}

interface Dependencies {
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface PackageJSON extends Partial<Dependencies> {
  name: string;
  workspaces?: string[];
}

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

function readJSONFile<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(filename, "utf-8"));
}
