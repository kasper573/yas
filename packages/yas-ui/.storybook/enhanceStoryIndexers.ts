import { StoryIndexer, Options } from "@storybook/types";
import * as path from "path";

export function enhanceStoryIndexers(
  indexers: StoryIndexer[],
  options: Options
): StoryIndexer[] {
  if (options.ci) {
    // The below implementation breaks when running the storybook test runner.
    // Instead of investigating and fixing the issue we simply skip the enhancement during tests,
    // since they're irrelevant there anyway.
    console.log("CI detected, skipping storybook indexers enhancement");
    return indexers;
  }

  return indexers.map(({ test, indexer }) => {
    return {
      test,
      async indexer(fileName, options) {
        return indexer(fileName, {
          ...options,
          makeTitle: (title) => autoPrefixTitle(fileName, title),
        });
      },
    };
  });
}

const absoluteSrcFolderPath = path.resolve(__dirname, "..", "src");

function autoPrefixTitle(fileName: string, title: string): string {
  const relativePath = path
    .relative(absoluteSrcFolderPath, path.dirname(fileName))
    .replace(/\\/g, "/");
  return `${relativePath}/${title}`;
}
