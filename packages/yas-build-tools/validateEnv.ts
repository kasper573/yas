import "./dotenv";
import * as path from "path";
import { ZodError } from "@yas/zod";

const envModuleFile = path.resolve(process.cwd(), "src/env.ts");
try {
  require(envModuleFile);
} catch (e) {
  if (e instanceof ZodError) {
    console.error(`Invalid env.ts: ${envModuleFile}`);
    console.error(e.issues);
  } else {
    console.error(e);
  }
  process.exit(1);
}
