import { createServer as createHTTPServer } from "http";
import type { InferResolvers } from "garph";
import { g, buildSchema } from "garph";
import type { YogaInitialContext } from "graphql-yoga";
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

export function createServer(graphqlEndpoint: string) {
  // Garph implicitly registers the types in the runtime globally in the g object,
  // so we don't really need the return value here. The function only has it for type inference.
  createClientTypes();

  let count = 0;

  const resolvers: InferResolvers<
    ClientTypes,
    { context: YogaInitialContext }
  > = {
    Query: {
      greeting: (_, { name }) => (name?.trim() ? `Hello, ${name}` : ""),
      count: () => count,
      error: () => {
        throw new Error("Manually triggered server side error");
      },
    },
    Mutation: {
      increaseCount: (parent, args, context, info) => {
        count += args.amount;
        return count;
      },
    },
  };

  const schema = buildSchema({ g, resolvers });
  const yoga = createYoga({ schema, graphqlEndpoint });
  return createHTTPServer(yoga);
}
