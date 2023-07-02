#!/usr/bin/env tsx

import * as path from "path";

async function runScriptsInOrder(
  distFolder: string = process.argv[2] ?? "dist"
) {
  distFolder = path.isAbsolute(distFolder)
    ? distFolder
    : path.resolve(process.cwd(), distFolder);
  console.log("Releasing", distFolder);
}

runScriptsInOrder();
