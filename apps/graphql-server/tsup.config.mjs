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
          console.log("Resolving:", args.path);
          if (args.path.includes("\\")) {
            const newPath = args.path.replace(/\\/g, "/");
            console.log("New Path:", newPath);
            return { path: newPath };
          }
        });
      },
    },
  ],
});
