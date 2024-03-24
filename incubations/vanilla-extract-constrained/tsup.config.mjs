import { createYasTsupConfig } from "@yas/build/tsup.mjs";

export default createYasTsupConfig({
  entry: {
    index: "src/index.ts",
    styleResolver: "src/styleResolver.ts",
    functionEvaluator: "src/functionEvaluator.ts",
  },
});
