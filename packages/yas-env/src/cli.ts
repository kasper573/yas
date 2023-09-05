#!/usr/bin/env tsx

import * as path from "path";
import * as fs from "fs";
import * as process from "process";
import { ZodError } from "@yas/zod";
import dotEnvFlow from "dotenv-flow";
import dotEnvExpand from "dotenv-expand";
import { execaCommandSync } from "execa";

main();

function main() {
  const projectRoot = process.cwd();

  // Load env flow files and apply variable expansion
  dotEnvExpand.expand(
    dotEnvFlow.config({
      path: projectRoot,
      default_node_env: "development",
    }),
  );

  const result = validateEnv(projectRoot);

  if (result?.valid === false) {
    console.log(`❌  Invalid env file: ${result.filepath}`);
    console.error(errorToString(result.error));
    process.exit(1);
    return;
  }

  if (result?.valid) {
    console.log(`✅  Validated env file: ${result.filepath}`);
  }

  const spawnArgs = process.argv.slice(2);
  if (spawnArgs.length) {
    execaCommandSync(spawnArgs.join(" "), { stdio: "inherit" });
  } else {
    console.log("No command to run. Exiting.");
  }
}

function validateEnv(projectRoot: string) {
  for (const envFile of require("./validEnvFiles")) {
    const filepath = path.resolve(projectRoot, envFile);
    if (fs.existsSync(filepath)) {
      const envFileImportPath = path.relative(__dirname, filepath);
      try {
        // We need to normalize the env file to use process.env instead of import.meta.env
        normalizeModule(envFileImportPath, (normalizedEnvFilePath) => {
          require(normalizedEnvFilePath);
        });
        return { valid: true, filepath };
      } catch (error) {
        return { valid: false, filepath, error };
      }
    }
  }
}

function errorToString(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
  }
  return String(error);
}

function normalizeModule(
  filepath: string,
  handleNormalizedFile: (normalizedFilePath: string) => void,
) {
  // Hacky, but works really well. You'd have to go out of your way to break this. Not worth the effort doing it with ASTs.
  const original = fs.readFileSync(filepath, "utf8");
  const normalized = original.replaceAll("import.meta.env.", "process.env.");

  if (original === normalized) {
    handleNormalizedFile(filepath);
    return;
  }

  const normalizedFilePath = filepath + ".normalized" + path.extname(filepath);
  fs.writeFileSync(normalizedFilePath, normalized);
  try {
    handleNormalizedFile(normalizedFilePath);
  } finally {
    fs.unlinkSync(normalizedFilePath);
  }
}
