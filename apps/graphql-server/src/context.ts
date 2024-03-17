import { createUserLoader, type UserLoader } from "./modules/user";

export function createContext(request: Request): Context {
  const headers = parseRequestHeaders(request);
  return {
    clientId: headers["client-id"],
    loaders: {
      user: createUserLoader(),
    },
  };
}

function parseRequestHeaders(request: Request) {
  return Object.fromEntries(request.headers.entries()) as unknown as Headers;
}

export type Context = {
  clientId: string;
  loaders: {
    user: UserLoader;
  };
};

export interface Headers {
  "client-id": string;
}
