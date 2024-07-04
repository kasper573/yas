import { z, mode, truthy } from "@yas/validate";

const schema = z.object({
  CI: truthy.default(false),
  mode: mode.default("development"),
  trpcServerUrl: z.string().default("http://localhost/trpc-server-url-missing"),
  graphqlServerUrl: z
    .string()
    .default("http://localhost/graphql-server-url-missing"),
  showErrorDetails: truthy.default(false),
  useErrorBoundary: truthy.default(true),
});

export const env = schema.parse({
  CI: process.env.CI,
  mode: process.env.NODE_ENV,
  trpcServerUrl: process.env.TRPC_SERVER_URL,
  graphqlServerUrl: process.env.GRAPHQL_SERVER_URL,
  showErrorDetails: process.env.SHOW_ERROR_DETAILS,
  useErrorBoundary: process.env.USE_ERROR_BOUNDARY,
});
