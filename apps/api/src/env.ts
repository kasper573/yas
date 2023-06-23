import * as path from "path";
import { z } from "zod";
import { config } from "dotenv-flow";
import { expand } from "dotenv-expand";
import { mode, numeric } from "@yas/zod";

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
  corsOrigin: z
    .array(z.string().url())
    .optional()
    .transform((v) => (v?.length === 0 ? undefined : v)),
  logFormat: z.enum(["tiny", "short", "dev", "combined"]).default("combined"),
  runtime: z.discriminatedUnion("type", [
    z.object({ type: z.literal("vercel-serverless-function") }),
    z.object({ type: z.literal("long-running-server"), port: numeric }),
  ]),
});

export const env = schema.parse({
  mode: process.env.NODE_ENV,
  corsOrigin: (process.env.CORS_ORIGIN ?? "").split(",").filter(Boolean),
  trpcPath: process.env.TRPC_PATH,
  logFormat: process.env.LOG_FORMAT,
  runtime:
    process.env.SERVE_ON_PORT !== undefined
      ? { type: "long-running-server", port: process.env.SERVE_ON_PORT }
      : { type: "vercel-serverless-function" },
});
