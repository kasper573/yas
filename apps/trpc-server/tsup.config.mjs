import { createYasTsupConfig } from "@yas/build/tsup.mjs";

export default createYasTsupConfig(process.cwd(), {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
});
