#!/usr/bin/env tsx

import * as process from "process";
import { ZodError } from "@yas/zod";
import dotEnvFlow from "dotenv-flow";
import dotEnvExpand from "dotenv-expand";
import { execaCommandSync } from "execa";
import { getEnvFile, validateEnv } from "./utils";

main();

function main() {
  const projectRoot = process.cwd();

  const { env } = process;
  const default_node_env = "development";
  const node_env = env.NODE_ENV;
  console.log(
    `📝  Loading env files for NODE_ENV=${node_env}${
      node_env ? "" : ` (fallback: ${default_node_env})`
    }`,
  );

  // Load env flow files and apply variable expansion
  dotEnvExpand.expand(
    dotEnvFlow.config({
      path: projectRoot,
      node_env,
      default_node_env,
    }),
  );

  const envFile = getEnvFile(projectRoot);
  const result = validateEnv(envFile);

  if (result?.valid === false) {
    console.log(`❌  Invalid env file: ${envFile}`);
    console.error(errorToString(result.error));
    process.exit(1);
    return;
  }

  if (result?.valid) {
    console.log(`✅  Validated env file: ${envFile}`);
    console.log(JSON.stringify(result.module, unknownToString, 2));
  }

  const spawnArgs = process.argv.slice(2);
  if (spawnArgs.length) {
    execaCommandSync(spawnArgs.join(" "), { stdio: "inherit" });
  } else {
    console.log("No command to run. Exiting.");
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

function unknownToString(key: string, value: unknown): unknown {
  if (value instanceof RegExp) {
    return value.toString();
  }
  if (value instanceof Set) {
    return Array.from(value);
  }
  if (value instanceof Map) {
    return Object.fromEntries(value.entries());
  }
  return value;
}
