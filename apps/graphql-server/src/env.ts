import { z, numeric } from "@yas/validate";

const schema = z.object({
  graphqlEndpoint: z.string().default("/"),
  runtime: z.discriminatedUnion("type", [
    z.object({ type: z.literal("lambda") }),
    z.object({ type: z.literal("server"), port: numeric }),
  ]),
});

export const env = schema.parse({
  graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
  runtime:
    process.env.SERVE_ON_PORT !== undefined
      ? { type: "server", port: process.env.SERVE_ON_PORT }
      : { type: "lambda" },
});
