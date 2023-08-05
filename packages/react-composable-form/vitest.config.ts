import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    typecheck: {
      tsconfig: path.resolve(__dirname, "src/__test__/tsconfig.json"),
    },
  },
});
