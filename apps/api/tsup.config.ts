import { defineConfig } from "tsup";

export default defineConfig({
  outExtension: () => ({ js: `.js` }),
  entryPoints: { index: "src/index.ts" },
  format: "esm",
  clean: true,
  noExternal: [/^@yas\//],
});
