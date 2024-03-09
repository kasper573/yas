import type * as trpcExpress from "@trpc/server/adapters/express";
import { FakeUserRepository } from "../modules/dashboard/FakeUserRepository";

export function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const headers = req.headers as unknown as TrpcServerHeaders;
  return {
    userRepository: new FakeUserRepository(),
    clientId: headers["client-id"],
  };
}

export type ApiContext = Awaited<ReturnType<typeof createContext>>;

export interface TrpcServerHeaders {
  "client-id": string;
}
