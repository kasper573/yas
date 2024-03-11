import { createServer as createHTTPServer } from "http";
import { createYoga } from "graphql-yoga";
import { env } from "./env";
import { getSchema } from "./schema.generated";
import type { Context, Headers } from "./types";

export function createServer(graphqlEndpoint: string) {
  const yoga = createYoga({
    schema: getSchema(),
    cors: corsSettingsForRequest,
    graphqlEndpoint,
    context: ({ request }) => createContext(request),
  });
  return createHTTPServer(yoga);
}

function corsSettingsForRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && env.corsOrigin.test(origin)) {
    return { origin };
  }

  return { origin: "Access denied by CORS policy" };
}

function createContext(request: Request): Context {
  const headers = parseRequestHeaders(request);
  return {
    clientId: headers["client-id"],
  };
}

function parseRequestHeaders(request: Request) {
  return Object.fromEntries(request.headers.entries()) as unknown as Headers;
}
