import * as fs from "fs/promises";
import * as path from "path";
import { createYasTsupConfig } from "@yas/build/tsup.mjs";
import tsConfig from "./tsconfig.json";

export default createYasTsupConfig(process.cwd(), {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
  esbuildPlugins: [fixImportsInGeneratedSchema()],
});

// Temporary workaround until this is fixed: https://github.com/captbaritone/grats/issues/128
function fixImportsInGeneratedSchema() {
  const schemaFile = path.resolve(__dirname, tsConfig.grats.tsSchema);
  return {
    name: "fix-imports-in-generated-schema",
    setup(build) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        const thisFile = path.resolve(args.resolveDir, args.path);
        if (thisFile !== schemaFile) {
          return;
        }

        return {
          loader: "ts",
          contents: await fs
            .readFile(args.path, "utf8")
            .then(normalizeImportPaths),
        };
      });
    },
  };
}

/**
 * Replaces \\ with / in imports
 */
export function normalizeImportPaths(code) {
  return code.replaceAll(
    /(from\s+['"])([^'"]+)(['"])/g,
    (_, p1, p2, p3) => `${p1}${p2.replaceAll(/\\+/g, "/")}${p3}`,
  );
}
