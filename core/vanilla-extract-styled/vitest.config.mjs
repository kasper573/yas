import { defineConfig } from "@yas/test/vitest/react/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { recipeClassName } from "./src/__test__/fixtures";

export default defineConfig(__dirname, {
  plugins: [
    vanillaExtractPlugin({
      // When a debugId is missing it's not technically always a recipe, but in our test suite it is.
      // This is a bit of a hack to be able to somewhat gracefully test recipe outputs.
      identifiers: ({ debugId }) => debugId ?? recipeClassName,
    }),
  ],
});
