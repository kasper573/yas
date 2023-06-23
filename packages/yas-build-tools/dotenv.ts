import * as path from "path";
import { expand } from "dotenv-expand";
import { config } from "dotenv-flow";

// Import this file in node apps who need environment variables.
// In node, we must manually load and expand the .env files.
// This ensures maximum compatibility, i.e. works with the local express server,
// and the default vercel serverless architecture.

expand(
  config({
    path: path.resolve(__dirname, "../.."),
    default_node_env: "development",
  })
);
