import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import type { ExecaError } from "execa";
import { execaSync, $ } from "execa";
import tsConfig from "./tsconfig.json";
import { normalizeImportPaths } from "./tsup.config.mjs";

// Asserts that the generated types and graphql schema are up to date

const {
  grats: { tsSchema, graphqlSchema },
} = tsConfig;

const tsBefore = fs.readFileSync(tsSchema, "utf-8");
const gqlBefore = fs.readFileSync(graphqlSchema, "utf-8");

$.sync`pnpm codegen`;

const tsAfter = fs.readFileSync(tsSchema, "utf-8");
const gqlAfter = fs.readFileSync(graphqlSchema, "utf-8");

fs.writeFileSync(tsSchema, tsBefore);
fs.writeFileSync(graphqlSchema, gqlBefore);

const isIdentical =
  compare(tsSchema, tsBefore, tsAfter) &&
  compare(graphqlSchema, gqlBefore, gqlAfter);

process.exit(isIdentical ? 0 : 1);

function compare(file: string, a: string, b: string) {
  try {
    const f1 = tempFile(normalizeImportPaths(a));
    const f2 = tempFile(normalizeImportPaths(b));
    execaSync("diff", [
      "-u",
      "--label",
      "Schema in repo",
      f1.path,
      "--label",
      "Schema after codegen",
      f2.path,
    ]);
    f1.release();
    f2.release();
    console.log(`✅  ${file} is up to date!`);
    return true;
  } catch (_) {
    const e = _ as ExecaError;
    if (e.stdout) {
      console.log(
        `❌  ${file} out of date. Run codegen and commit changes.\n` + e.stdout,
      );
    } else {
      console.log("Unexpected error", e.stdout || e.message || String(e));
    }
    return false;
  }
}

function tempFile(content: string) {
  const temp = path.resolve(os.tmpdir(), Math.random().toString(36).slice(2));
  fs.writeFileSync(temp, content);
  return {
    path: temp,
    release: () => fs.rmSync(temp),
  };
}
