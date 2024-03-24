import { createYasTsupConfig } from "@yas/build/tsup.mjs";

export default createYasTsupConfig({
  entry: {
    index: "src/index.ts",
    devtools: "src/devtools.ts",
  },
});
