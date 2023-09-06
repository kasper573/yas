import { defineConfig } from "tsup";
import { loadEnv } from "@yas/env/utils";

const env = loadEnv(process.cwd(), (key, value) => [key, value ?? ""]);

console.log("Will embed the following env in the API bundle:\n" + JSON.stringify(env, null, 2));

export default defineConfig({
  outExtension: () => ({ js: `.js` }),
  entry: { index: "src/index.ts" },
  format: "esm",
  clean: true,
  noExternal: [/^@yas\//],
  env,
});
