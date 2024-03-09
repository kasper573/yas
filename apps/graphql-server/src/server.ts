import { createServer as createHTTPServer } from "http";
import type { InferResolvers } from "garph";
import { g, buildSchema } from "garph";
import type { YogaInitialContext } from "graphql-yoga";
import { createYoga } from "graphql-yoga";

export function createServer(graphqlEndpoint: string) {
  const queryType = g.type("Query", {
    greet: g
      .string()
      .args({
        name: g.string().optional().default("Max"),
      })
      .description("Greets a person"),
  });

  const resolvers: InferResolvers<
    { Query: typeof queryType },
    { context: YogaInitialContext }
  > = {
    Query: {
      greet: (parent, args, context, info) => `Hello, ${args.name}`,
    },
  };

  const schema = buildSchema({ g, resolvers });
  const yoga = createYoga({ schema, graphqlEndpoint });
  return createHTTPServer(yoga);
}
