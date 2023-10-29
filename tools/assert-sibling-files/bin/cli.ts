#!/usr/bin/env tsx

import path from "path";
import { glob } from "glob";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function run(
  filePattern: string,
  siblingSuffix: string,
): Promise<number> {
  const targetFiles = (await glob(filePattern)).filter(
    (file) => !path.parse(file).name.endsWith(siblingSuffix),
  );

  console.log(
    `🚀  Making sure ${targetFiles.length} ${filePattern} files have ${siblingSuffix} sibling files`,
  );

  const hasSiblings = await Promise.all(targetFiles.map(hasSibling));
  const missingSiblings = targetFiles.filter((_, i) => !hasSiblings[i]);
  const foundSiblings = targetFiles.filter((_, i) => hasSiblings[i]);

  if (missingSiblings.length) {
    console.error(
      `❌  Missing ${
        missingSiblings.length
      } ${siblingSuffix} sibling files for:\n${missingSiblings
        .map((file) => `  ${file}`)
        .join("\n")}`,
    );
    console.log(
      `📂  Found ${
        foundSiblings.length
      } ${siblingSuffix} sibling files for:\n${foundSiblings
        .map((file) => `  ${file}`)
        .join("\n")}`,
    );
    return 1;
  }

  console.log(`✅  All ${filePattern} files have ${siblingSuffix} siblings`);

  return 0;

  async function hasSibling(targetFile: string): Promise<boolean> {
    const target = path.parse(targetFile);
    const siblingGlob = path
      .join(target.dir, target.name + siblingSuffix + "*")
      .replaceAll("\\", "/"); // Globify
    return (await glob(siblingGlob)).length > 0;
  }
}

const args = yargs(hideBin(process.argv))
  .usage(
    "Makes sure all files matching a pattern have a sibling file with the given suffix",
  )
  .options({
    filePattern: {
      type: "string",
      alias: "pattern",
      demandOption: true,
    },
    siblingSuffix: {
      type: "string",
      alias: "suffix",
      demandOption: true,
    },
  })
  .parseSync();

run(args.filePattern, args.siblingSuffix).then(process.exit);
