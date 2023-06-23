#!/usr/bin/env tsx

import "./dotenv";
import * as path from "path";
import { ZodError } from "@yas/zod";

const envModuleFile = path.resolve(process.cwd(), "src/env.ts");
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { env } = require(envModuleFile);
  console.log("Validated environment variables:", JSON.stringify(env, null, 2));
} catch (e) {
  if (e instanceof ZodError) {
    console.error(`Invalid env.ts: ${envModuleFile}`);
    console.error(e.issues);
  } else {
    console.error(e);
  }
  process.exit(1);
}
