#!/usr/bin/env tsx

import * as path from "path";
import * as fs from "fs";
import * as process from "process";
import { ZodError } from "zod";
import { sync as spawnSync } from "cross-spawn";

// This is an encapsulation of dotenv-cli embedded with the default flags of our liking.
// It also contains an extra step to validate env vars at build time.

// This is the default set of flags that we want to run dotenv-cli with.
const yasConventionArgs = ["-c", "development"];

const exitCode = main();
process.exit(exitCode);

function main(): number {
  // Run dotenv-cli without spawning any child processes
  // This allows us to load the env so that we can validate it
  runDotenvCLI(["--", "echo"]);

  const result = validateEnv();

  if (result?.valid === false) {
    console.log(`❌  Invalid env file: ${result.filepath}`);
    console.error(errorToString(result.error));
    return 1;
  }

  if (result?.valid) {
    console.log(`✅  Validated env file: ${result.filepath}`);
  }

  // Now that we know the env is valid,
  // we can run dotenv-cli with the original arguments to spawn the child process
  const userArgs = process.argv.slice(2);
  runDotenvCLI(userArgs);
  return 0;
}

function runDotenvCLI(args: string[]) {
  const nodePath = process.argv[0];
  const cliPath = require.resolve("dotenv-cli/cli");
  const argsWithConvention = [...yasConventionArgs, ...args];
  spawnSync(`"${nodePath}" "${cliPath}" ${argsWithConvention.join(" ")}`, {
    stdio: "inherit",
  });
}

function validateEnv() {
  for (const envFile of require("eslint-config-yas/validEnvFiles")) {
    const filepath = path.resolve(process.cwd(), envFile);
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
