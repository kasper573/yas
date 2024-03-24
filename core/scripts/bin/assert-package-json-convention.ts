#!/usr/bin/env tsx

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { Package } from "../src/workspace";
import { loadWorkspaces } from "../src/workspace";

const args = yargs(hideBin(process.argv))
  .usage(
    "Makes sure all package.json files follow our project specific convention",
  )
  .options({
    packageNames: {
      type: "string",
      array: true,
      alias: "p",
    },
    exclude: {
      type: "string",
      default: "core\\/",
      alias: "e",
    },
  })
  .parseSync();

run(args).then(process.exit);

async function run({ packageNames, exclude }: typeof args): Promise<number> {
  const errorCount = 0;

  for (const workspace of loadWorkspaces(process.cwd())) {
    for (const pkg of workspace.packages) {
      if (packageNames && !packageNames.includes(pkg.name)) {
        continue;
      }
      if (exclude && new RegExp(exclude).test(pkg.dir)) {
        continue;
      }

      const errors = Array.from(packageConventionErrors(pkg));
      if (errors.length) {
        console.error(
          `❌  Package "${pkg.name}" does not follow convention:\n\t${errors.join("\n\t")}`,
        );
      } else {
        console.log(`✅  Package "${pkg.name}" follows convention`);
      }
    }
  }
  return errorCount ? 1 : 0;
}

function* packageConventionErrors(pkg: Package): Generator<string> {
  const paths = [
    ["main"],
    ["module"],
    ["types"],
    ["scripts", "typecheck"],
    ["scripts", "lint"],
  ];

  const expectations = {
    main: "./dist/index.js",
    module: "./dist/index.mjs",
    types: "./dist/index.d.ts",
    files: ["dist/**"],
    scripts: {
      typecheck: /^tsc --noEmit/,
      lint: /^pnpm eslint . --max-warnings=0/,
    },
  };

  for (const path of paths) {
    const packageValue = path.reduce((acc, key) => acc?.[key], pkg as any);
    const expectation = path.reduce(
      (acc, key) => acc?.[key],
      expectations as any,
    );

    if (expectation instanceof RegExp) {
      if (!expectation.test(packageValue)) {
        yield `Expected ${path.join(".")} to match "${expectation}" but found "${packageValue}"`;
      }
    } else {
      if (packageValue !== expectation) {
        yield `Expected ${path.join(".")} to equal "${expectation}" but found "${packageValue}"`;
      }
    }
  }
}
