import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "../env";
import { createContext } from "./context";
import { createTrpcRouter } from "./router";

morgan.token("url", urlFormatter);

export function createServer() {
  const app = express();
  app.use(morgan(env.logFormat));
  app.use(cors({ origin: env.corsOrigin }));
  app.use(
    env.trpcPath,
    trpcExpress.createExpressMiddleware({
      router: createTrpcRouter(),
      createContext,
    }),
  );

  app.use("/healthz", (_, res) => res.send("ok"));
  return app;
}

function formatTRPCUrlParams(url: URL) {
  const { pathname, hash, searchParams } = url;
  const { batch, input } = Object.fromEntries(searchParams.entries());
  const { json } = JSON.parse(input)[+batch - 1];
  return `${pathname}${hash}\n${JSON.stringify(json, null, 2)}`;
}

function urlFormatter(req: express.Request) {
  const url = req.originalUrl || req.url;
  try {
    const base = `${req.protocol}://${req.get("host") ?? req.hostname}`;
    return formatTRPCUrlParams(new URL(url, base));
  } catch {
    return url;
  }
}
