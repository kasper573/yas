import morgan from "morgan";
import express from "express";
import cors from "cors";
import { env } from "../env";
import { createServer } from "../server";

function main() {
  const port = process.argv[2];
  if (!port) {
    console.error("Missing port argument");
    return;
  }

  const api = express();
  api.use(cors());
  api.use(morgan(env.logFormat));
  api.use(createServer());
  api.listen(port, () =>
    console.log(`tRPC API started on http://localhost:${port}${env.trpcPath}`)
  );
}

main();
