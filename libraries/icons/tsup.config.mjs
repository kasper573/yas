import { defineConfig } from "@yas/build/tsup.mjs";

export default defineConfig(__dirname, { entry: { index: "src/index.ts" } });
