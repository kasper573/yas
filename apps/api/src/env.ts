import * as path from "path";
import { z } from "zod";
import { config } from "dotenv-flow";
import { expand } from "dotenv-expand";
import { mode, truthy } from "@yas/zod";
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
  introspection: truthy.default(true),
  playground: truthy.default(true),
  logFormat: morganFormat.default("combined"),
  generateClient: truthy.default(false),
  services: z.object({
    movies: z.object({
      url: z.string().url(),
      key: z.string(),
    }),
  }),
});

export const env = schema.parse({
  mode: process.env.NODE_ENV,
  trpcPath: process.env.TRPC_PATH,
  logFormat: process.env.LOG_FORMAT,
  introspection: process.env.GQL_INTROSPECTION,
  playground: process.env.GQL_PLAYGROUND,
  generateClient: process.env.GQL_GENERATE_CLIENT,
  services: {
    movies: {
      url: process.env.FAVORITE_MOVIES_API_URL,
      key: process.env.FAVORITE_MOVIES_API_PUBLIC_KEY,
    },
  },
});
