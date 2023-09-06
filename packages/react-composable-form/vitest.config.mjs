import { defineConfig } from "@yas/vitest/presets/react";
import path from "path";

export default defineConfig({
  test: {
    typecheck: {
      tsconfig: path.resolve(__dirname, "src/__test__/tsconfig.json"),
    },
  },
});
