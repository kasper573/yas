import { createServer as createHTTPServer } from "http";
import { createYoga } from "graphql-yoga";
import { env } from "./env";
import { getSchema } from "./schema.generated";
import { createContext } from "./context";

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
