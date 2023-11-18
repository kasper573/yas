import { defineConfig } from "@yas/test/vitest/node/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(__dirname, {
  plugins: [vanillaExtractPlugin()],
});
