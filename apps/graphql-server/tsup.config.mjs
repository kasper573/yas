import * as fs from "fs/promises";
import * as path from "path";
import { defineConfig } from "@yas/build/tsup.mjs";
import tsConfig from "./tsconfig.json";

export default defineConfig({
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
});
