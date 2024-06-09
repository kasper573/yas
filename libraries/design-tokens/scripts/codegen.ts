import * as path from "path";
import { generate } from "figma-to-typescript";

const inputPath = process.argv[process.argv.length - 1];

generate({
  inputPath,
  sharedImportName: "__shared__",
  sharedOutputPath: path.resolve(__dirname, "../src/shared.ts"),
  parseTokenName: (name) => name.split("/"),
  themeOutputPath: (themeName) =>
    path.resolve(__dirname, "../themes", `${snakeCase(themeName)}.ts`),
  codeHeader: "// This file is generated. Do not modify manually.\n\n",
  exitWithNonZeroOnError: true,
  transformers: {
    identifier: snakeCase,
    type: pascalCase,
  },
});

function snakeCase(str: string): string {
  return words(str)
    .map((w) => w.toLowerCase())
    .join("_");
}

function pascalCase(str: string): string {
  return words(str)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function words(str: string): string[] {
  return str
    .replaceAll(/[^a-zA-Z0-9_\s]/g, "")
    .trim()
    .split(/[\s\-_]|(?=[A-Z])/);
}
