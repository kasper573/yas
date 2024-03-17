import type { ID } from "grats";
import type { UserRepository } from "./modules/user/repository";
import { createUserRepository } from "./modules/user/repository";
import type { FeedRepository } from "./modules/feed/repository";
import { createFeedRepository } from "./modules/feed/repository";
import type { GraphQLServerHeaders } from "./types";

export function createContext(
  headers: GraphQLServerHeaders,
): GraphQLServerContext {
  return {
    clientId: headers["client-id"],
    repositories: {
      user: createUserRepository(),
      feed: createFeedRepository(),
    },
  };
}

export interface GraphQLServerContext {
  clientId: ID;
  repositories: {
    user: UserRepository;
    feed: FeedRepository;
  };
}
