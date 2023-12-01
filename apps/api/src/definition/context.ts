import type { inferAsyncReturnType } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

export function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return {};
}

export type ApiContext = inferAsyncReturnType<typeof createContext>;
