import * as fs from "fs/promises";
import * as path from "path";
import { defineConfig, inferInternalPackages } from "@yas/build/tsup.mjs";
import tsConfig from "./tsconfig.json";

export default defineConfig(__dirname, {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
  noExternal: inferInternalPackages(__dirname),
});
