import * as path from "path";
import { z, mode, numeric } from "@yas/zod";
import { expand } from "dotenv-expand";
import { config } from "dotenv-flow";

expand(
  config({
    path: path.resolve(__dirname, "../../.."),
    default_node_env: "development",
  }),
);

const schema = z.object({
  mode: mode.default("development"),
  trpcPath: z.string().default("/trpc"),
  corsOrigin: z.string().transform((exp) => new RegExp(exp)),
  logFormat: z.enum(["tiny", "short", "dev", "combined"]).default("combined"),
  runtime: z.discriminatedUnion("type", [
    z.object({ type: z.literal("lambda") }),
    z.object({ type: z.literal("server"), port: numeric }),
  ]),
});

export const env = schema.parse({
  mode: process.env.NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN_REGEX,
  trpcPath: process.env.TRPC_PATH,
  logFormat: process.env.LOG_FORMAT,
  runtime:
    process.env.SERVE_ON_PORT !== undefined
      ? { type: "server", port: process.env.SERVE_ON_PORT }
      : { type: "lambda" },
});
