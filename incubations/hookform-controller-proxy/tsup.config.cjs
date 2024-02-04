import { createYasTsupConfig } from "@yas/build/tsup";

export default createYasTsupConfig(process.cwd(), {
  entry: { index: "src/index.tsx" },
});
