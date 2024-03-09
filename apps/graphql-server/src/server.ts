import { createServer as createHTTPServer } from "http";
import type { InferResolvers } from "garph";
import { g, buildSchema } from "garph";
import { createYoga } from "graphql-yoga";

export type ClientTypes = ReturnType<typeof createClientTypes>;

function createClientTypes() {
  const Query = g.type("Query", {
    greeting: g
      .string()
      .args({
        name: g.string().optional().default("Max"),
      })
      .description("Greets a person"),
    count: g.int(),
    error: g
      .int()
      .description("Query this field to manually trigger a server side error"),
  });

  const Mutation = g.type("Mutation", {
    increaseCount: g
      .int()
      .args({ amount: g.int() })
      .description("Increases count by the given amount"),
  });

  return { Query, Mutation };
}

function createResolvers(): InferResolvers<ClientTypes, { context: Context }> {
  const countsPerClient = new Map<string, number>();
  return {
    Query: {
      greeting: (_, { name }) => (name?.trim() ? `Hello, ${name}!` : ""),
      count: (_1, _2, ctx) => {
        return countsPerClient.get(ctx.clientId) ?? 0;
      },
      error: () => {
        throw new Error("Manually triggered server side error");
      },
    },
    Mutation: {
      increaseCount: (_, { amount }, ctx) => {
        let myCount = countsPerClient.get(ctx.clientId) ?? 0;
        myCount += amount;
        countsPerClient.set(ctx.clientId, myCount);
        return myCount;
      },
    },
  };
}

export function createServer(graphqlEndpoint: string) {
  // Garph implicitly registers the types in the runtime globally in the g object,
  // so we don't really need the return value here. The function only has it for type inference.
  createClientTypes();

  const schema = buildSchema({ g, resolvers: createResolvers() });
  const yoga = createYoga({
    schema,
    graphqlEndpoint,
    context: ({ request }) => createContext(request),
  });
  return createHTTPServer(yoga);
}

type Context = ReturnType<typeof createContext>;
function createContext(request: Request) {
  const headers = getGraphQLServerHeaders(request);
  return {
    clientId: headers["client-id"],
  };
}

export interface GraphQLServerHeaders {
  "client-id": string;
}

function getGraphQLServerHeaders(request: Request) {
  return Object.fromEntries(
    request.headers.entries(),
  ) as unknown as GraphQLServerHeaders;
}
