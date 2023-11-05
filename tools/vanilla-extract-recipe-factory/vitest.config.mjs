import { defineConfig } from "@yas/test/presets/vitest/node";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(__dirname, {
  plugins: [vanillaExtractPlugin()],
});
