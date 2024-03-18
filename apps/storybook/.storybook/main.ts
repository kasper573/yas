import * as fs from "fs";
import * as path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
const { createYasViteConfig } = require("@yas/build/vite.mjs");

const rootDir = path.resolve(__dirname, "../../../");

const config: StorybookConfig = {
  stories: storiesForEachPackage(rootDir),
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(storybooksBuiltinViteConfig) {
    return mergeConfig(
      storybooksBuiltinViteConfig,
      createYasViteConfig(__dirname, {
        // Storybook already has the react vite plugin added
        useReact: false,
        // Since the storybook is for the entire repo,
        // vite-plugin-checker must be given a tsconfig represents the entire repo.
        tsconfigPath: path.resolve(
          rootDir,
          "tsconfig.storybook-vite-plugin-checker.json",
        ),
      }),
    );
  },
  docs: {
    autodocs: true,
  },
  core: {
    disableTelemetry: true,
  },
};

function storiesForEachPackage(rootDir: string): StoriesSpecifier[] {
  const pkg = loadPackageJson(rootDir);

  const workspacePaths = pkg?.workspaces?.map((workspacePattern) =>
    path.resolve(rootDir, workspacePattern.replace("/*", "")),
  );

  return (workspacePaths ?? []).flatMap((workspacePath) =>
    fs
      .readdirSync(workspacePath, { withFileTypes: true })
      .filter((file) => file.isDirectory())
      .map((dir): StoriesSpecifier => {
        const pkg = loadPackageJson(path.resolve(workspacePath, dir.name));
        return {
          directory: path.resolve(workspacePath, dir.name, "src"),
          titlePrefix: `${pkg ? pkg.name : dir.name}/`,
        };
      }),
  );
}

// Storybook doesnt expose this type, buut it's the same as the one in the storybook source code
interface StoriesSpecifier {
  titlePrefix?: string;
  directory: string;
  files?: string;
}

function loadPackageJson(
  dir: string,
): { workspaces?: string[]; name: string } | undefined {
  try {
    return JSON.parse(
      fs.readFileSync(path.resolve(dir, "package.json"), "utf-8"),
    );
  } catch {
    return;
  }
}

export default config;
