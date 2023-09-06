import { defineConfig } from "tsup";
import { loadEnv } from "@yas/env/utils";

export default defineConfig({
  outExtension: () => ({ js: `.js` }),
  entry: { index: "src/index.ts" },
  format: "esm",
  clean: true,
  noExternal: [/^@yas\//],
  env: loadEnv(process.cwd(), (key, value) => [key, value ?? ""])
});
