import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createApiRouter } from "./router";
import { createContext } from "./context";
import { env } from "./env";

export function createServer() {
  const app = express();
  app.use(
    env.trpcPath,
    trpcExpress.createExpressMiddleware({
      router: createApiRouter(),
      createContext,
    })
  );
  app.use("/healthz", (_, res) => res.send("ok"));
  return app;
}
