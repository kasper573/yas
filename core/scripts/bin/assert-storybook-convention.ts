#!/usr/bin/env tsx

import path from "path";
import { glob } from "glob";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const storySuffix = ".stories";

async function run(componentsDir: string, storiesDir: string): Promise<number> {
  const componentFiles = await glob("**/*.tsx", { cwd: componentsDir });
  const storyFiles = await glob(`**/*${storySuffix}.*`, { cwd: storiesDir });

  console.log(
    `🚀  Comparing ${componentFiles.length} component files against ${storyFiles.length} story files.\n` +
      `Components directory: ${componentsDir}\nStories directory: ${storiesDir}`,
  );

  const results = componentFiles.map(checkForStory);
  const missing = results.filter((r) => !r.ok).map((r) => r.storyFile);
  const found = results.filter((r) => r.ok).map((r) => r.storyFile);

  if (missing.length) {
    console.error(
      `❌  Missing ${missing.length} stories:\n${missing
        .map((file) => `  ${file}`)
        .join("\n")}`,
    );
    if (found.length) {
      console.log(
        `📂  Found ${found.length} stories:\n${found
          .map((file) => `  ${file}`)
          .join("\n")}`,
      );
    }
    return 1;
  }

  console.log(`✅  All components have stories!`);

  return 0;

  function checkForStory(relativeComponentFile: string) {
    const expectedStoryFile =
      withoutExtension(relativeComponentFile) + storySuffix;

    const storyFile = storyFiles.find((storyFile) => {
      return storyFile.startsWith(expectedStoryFile);
    });

    return storyFile !== undefined
      ? { ok: true, storyFile }
      : { ok: false, storyFile: expectedStoryFile + ".*" };
  }
}

function withoutExtension(filePath: string): string {
  return path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)),
  );
}

const storybookDir = path.resolve(__dirname, "../../../apps/storybook");
const { componentsDir, storiesDir } = yargs(hideBin(process.argv))
  .usage(
    "Makes sure all react components in the package has a corresponding story defined in the storybook app",
  )
  .options({
    componentsDir: {
      alias: "c",
      type: "string",
      default: path.resolve(process.cwd(), "src"),
      description: "Directory where the components are located",
    },
    storiesDir: {
      alias: "s",
      type: "string",
      default: path.resolve(storybookDir, "src", path.basename(process.cwd())),
      description: "Directory where the stories are located",
    },
  })
  .parseSync();

run(
  path.resolve(componentsDir),
  path.isAbsolute(storiesDir)
    ? storiesDir
    : path.resolve(storybookDir, storiesDir),
).then(process.exit);
