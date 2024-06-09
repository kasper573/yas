import * as fs from "fs";
import * as path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
const { mergeConfig } = require("vite");
const { createYasViteConfig } = require("@yas/build/vite");

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
  async viteFinal(builtinConfig) {
    return mergeConfig(
      builtinConfig,
      createYasViteConfig(__dirname, {
        useReact: false, // Already included in storybook
      }),
    );
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
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

type StoriesSpecifier = Extract<
  StorybookConfig["stories"],
  Array<unknown>
>[number];

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
