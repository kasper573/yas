import type { ID } from "grats";
import type { UserRepository } from "./modules/user/repository";
import { createUserRepository } from "./modules/user/repository";
import type { FeedRepository } from "./modules/feed/repository";
import { createFeedRepository } from "./modules/feed/repository";

export function createContext(request: Request): Context {
  const headers = parseRequestHeaders(request);
  const clientId = headers["client-id"];
  return {
    clientId,
    repositories: {
      user: createUserRepository(),
      feed: createFeedRepository(),
    },
  };
}

function parseRequestHeaders(request: Request) {
  return Object.fromEntries(request.headers.entries()) as unknown as Headers;
}

export type Context = {
  clientId: ID;
  repositories: {
    user: UserRepository;
    feed: FeedRepository;
  };
};

export interface Headers {
  "client-id": ID;
}
