import { defineConfig } from "tsup";

export default defineConfig({
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
