// @ts-check

import { defineConfig } from "@yas/test/playwright/config.mjs";
import { env } from "./src/env";

const webAppURL = "http://localhost:4173";
export default defineConfig({
  baseURL: webAppURL,
  isCI: env.CI,
  webServers: [
    {
      command: "pnpm build:test && pnpm preview",
      url: webAppURL,
    },
    {
      command: "pnpm --filter @yas/trpc-server dev",
      url: getTrpcHealthUrl(),
    },
    {
      command: "pnpm --filter @yas/graphql-server dev",
      url: env.graphqlServerUrl,
    },
  ],
});

function getTrpcHealthUrl() {
  const url = new URL(env.trpcServerUrl);
  url.pathname = "/healthz";
  return url.toString();
}
