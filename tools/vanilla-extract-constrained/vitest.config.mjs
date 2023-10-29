import { defineConfig } from "@yas/vitest/presets/react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(__dirname, {
  plugins: [vanillaExtractPlugin()],
});
