import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "api", // Output to Vercel's /api folder
  outExtension: () => ({ js: `.js` }),
  entryPoints: {
    index: "src/entrypoints/prod.ts",
  },
  format: "esm",
  clean: true,
  noExternal: [/^@yas\//],
});
