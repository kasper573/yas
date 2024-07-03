import { z, numeric } from "@yas/validate";

const canNeverHappen = "^(?=a)b";

const schema = z.object({
  graphqlEndpoint: z.string().default("/"),
  corsOrigin: z
    .string()
    .default(canNeverHappen)
    .transform((exp) => new RegExp(exp)),
  runtime: z.discriminatedUnion("type", [
    z.object({ type: z.literal("lambda") }),
    z.object({ type: z.literal("server"), port: numeric }),
  ]),
});

export const env = schema.parse({
  graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
  corsOrigin: process.env.CORS_ORIGIN_REGEX,
  runtime:
    process.env.SERVE_ON_PORT !== undefined
      ? { type: "server", port: process.env.SERVE_ON_PORT }
      : { type: "lambda" },
});
