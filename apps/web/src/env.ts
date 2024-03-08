import { z, mode, truthy } from "@yas/validate";

const schema = z.object({
  CI: truthy.default(false),
  mode: mode.default("development"),
  trpcServerUrl: z.string().url(),
  graphqlServerUrl: z.string().url(),
});

export const env = schema.parse({
  CI: process.env.CI,
  mode: process.env.NODE_ENV,
  trpcServerUrl: process.env.TRPC_SERVER_URL,
  graphqlServerUrl: process.env.GRAPHQL_SERVER_URL,
});
