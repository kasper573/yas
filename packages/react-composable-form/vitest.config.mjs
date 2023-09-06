import * as path from "path";
import { defineConfig } from "@yas/vitest/presets/react/index.mjs";

export default defineConfig({
  test: {
    typecheck: {
      tsconfig: path.resolve(__dirname, "src/__test__/tsconfig.json"),
    },
  },
});
