// @ts-check

import { defineConfig } from "@yas/test/playwright/config.mjs";
import { require } from "tsx/cjs/api";

/**
 * @type {import("./src/env")}
 */
const { env } = require("./src/env", import.meta.url);

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
