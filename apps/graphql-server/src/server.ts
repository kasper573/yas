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
    count: g.int(),
  });

  const mutationType = g.type("Mutation", {
    greet: g
      .string()
      .args({
        name: g.string().optional().default("Max"),
      })
      .description("Greets a person"),
    increaseCount: g
      .int()
      .args({ amount: g.int() })
      .description("Increases count by the given amount"),
  });

  const pocUnsafeMemory = {
    count: 0,
  };

  const resolvers: InferResolvers<
    { Query: typeof queryType; Mutation: typeof mutationType },
    { context: YogaInitialContext }
  > = {
    Query: {
      greet: (parent, args, context, info) => `Hello, ${args.name}`,
      count: () => pocUnsafeMemory.count,
    },
    Mutation: {
      increaseCount: (parent, args, context, info) => {
        pocUnsafeMemory.count += args.amount;
        return pocUnsafeMemory.count;
      },
    },
  };

  const schema = buildSchema({ g, resolvers });
  const yoga = createYoga({ schema, graphqlEndpoint });
  return createHTTPServer(yoga);
}
