import type { inferAsyncReturnType } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";
import { FakeUserRepository } from "../repositories/FakeUserRepository";

export function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return {
    userRepository: new FakeUserRepository(),
  };
}

export type ApiContext = inferAsyncReturnType<typeof createContext>;
