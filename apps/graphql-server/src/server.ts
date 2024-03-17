import { createServer as createHTTPServer } from "http";
import { createYoga } from "graphql-yoga";
import { getSchema } from "../schema.generated";
import { env } from "./env";
import { createContext } from "./context";
import { addScalarsToSchema } from "./scalars";

export function createServer(graphqlEndpoint: string) {
  const schema = getSchema();
  addScalarsToSchema(schema);
  const yoga = createYoga({
    schema,
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
