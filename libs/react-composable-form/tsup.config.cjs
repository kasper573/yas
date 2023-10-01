import { createYasTsupConfig } from "@yas/build-tools/tsup";

export default createYasTsupConfig(process.cwd(), {
  entry: { index: "src/index.ts" },
});
