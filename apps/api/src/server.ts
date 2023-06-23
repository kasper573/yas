import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createContext } from "./context";
import { env } from "./env";
import { createApiRouter } from "./router";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(
    env.trpcPath,
    trpcExpress.createExpressMiddleware({
      router: createApiRouter(),
      createContext,
    })
  );
  app.use(morgan(env.logFormat));
  app.use("/healthz", (_, res) => res.send("ok"));
  return app;
}
