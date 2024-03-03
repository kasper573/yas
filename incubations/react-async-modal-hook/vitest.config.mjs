import * as path from "path";
import { defineConfig } from "@yas/test/vitest/react/config";

export default defineConfig(__dirname, {
  test: {
    typecheck: {
      tsconfig: path.resolve(__dirname, "test/tsconfig.json"),
    },
  },
});
