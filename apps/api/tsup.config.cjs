import { createYasTsupConfig } from "@yas/build/tsup";

export default createYasTsupConfig(process.cwd(), {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/index.ts" },
  dts: false,
});
