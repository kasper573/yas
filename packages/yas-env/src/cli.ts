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
  for (const projectRelativeEnvFile of require("./validEnvFiles")) {
    const filepath = path.resolve(projectRoot, projectRelativeEnvFile);
    if (fs.existsSync(filepath)) {
      try {
        require(path.relative(__dirname, filepath));
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
