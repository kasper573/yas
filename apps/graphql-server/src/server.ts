import { createServer as createHTTPServer } from "http";
import { createYoga } from "graphql-yoga";
import { getSchema } from "../schema.generated";
import { env } from "./env";
import { createContext } from "./context";
import { addScalarsToSchema } from "./scalars";
import type { GraphQLServerHeaders } from "./types";

export function createServer(graphqlEndpoint: string) {
  const schema = getSchema();
  addScalarsToSchema(schema);
  const yoga = createYoga({
    schema,
    cors: corsSettingsForRequest,
    graphqlEndpoint,
    context: ({ request }) => createContext(parseRequestHeaders(request)),
  });
  return createHTTPServer(yoga);
}

function corsSettingsForRequest(request: Request) {
  const origin = request.headers.get("origin");

  console.log("corsSettingsForRequest", origin);

  if (origin && env.corsOrigin.test(origin)) {
    return { origin };
  }

  return { origin: "Access denied by CORS policy" };
}

function parseRequestHeaders(request: Request): GraphQLServerHeaders {
  return Object.fromEntries(
    request.headers.entries(),
  ) as unknown as GraphQLServerHeaders;
}
