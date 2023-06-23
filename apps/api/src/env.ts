import * as path from "path";
import { z } from "zod";
import { config } from "dotenv-flow";
import { expand } from "dotenv-expand";
import { mode } from "@yas/zod";
import { morganFormat } from "./zod/morganFormat";

// Since this is a node app we must manually load and expand the .env files
// This ensures maximum compatibility, i.e. works with the local express server,
// and the default vercel serverless architecture.
expand(
  config({
    path: path.resolve(__dirname, "../../.."),
    default_node_env: "development",
  })
);

const schema = z.object({
  mode: mode.default("development"),
  trpcPath: z.string().default("/trpc"),
  logFormat: morganFormat.default("combined"),
});

export const env = schema.parse({
  mode: process.env.NODE_ENV,
  trpcPath: process.env.TRPC_PATH,
  logFormat: process.env.LOG_FORMAT,
});
