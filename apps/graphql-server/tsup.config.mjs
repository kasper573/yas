import { createYasTsupConfig } from "@yas/build/tsup.mjs";

export default createYasTsupConfig(process.cwd(), {
  outExtension: () => ({ js: `.js` }),
  format: "esm",
  entry: { index: "src/entrypoint.ts" },
  dts: false,
  plugins: [fixPathSeparatorPlugin()],
});

function fixPathSeparatorPlugin() {
  return {
    name: "fix-path-separator",
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const path = args.path.replace(/\\+/g, "/"); // Replace backslashes with forward slashes
        return { path };
      });
    },
  };
}
