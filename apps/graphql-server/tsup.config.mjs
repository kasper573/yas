import { createYasTsupConfig } from "@yas/build/tsup.mjs";

export default createYasTsupConfig(process.cwd(), {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
  plugins: [
    {
      name: "fix-import-paths",
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.path.includes("\\")) {
            return {
              path: args.path.replace(/\\/g, "/"),
            };
          }
        });
      },
    },
  ],
});
