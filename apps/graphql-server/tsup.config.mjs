import { createYasTsupConfig } from "@yas/build/tsup.mjs";

export default createYasTsupConfig(process.cwd(), {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
  plugins: [
    {
      name: "path-transform",
      resolveId(source, importer) {
        if (source.includes("\\")) {
          const transformedSource = source.replace(/\\/g, "/");
          return this.resolve(transformedSource, importer, {
            skipSelf: true,
          }).then((resolved) => {
            return resolved || null;
          });
        }
        return null;
      },
    },
  ],
});
