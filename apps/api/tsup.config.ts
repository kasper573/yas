import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "api", // Output to Vercel's /api folder
  entryPoints: {
    index: "src/entrypoints/prod.ts",
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  dts: false,
  noExternal: [/^@yas\//],
});
