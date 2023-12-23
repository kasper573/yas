import { defineConfig } from "@yas/test/playwright/config";
import { env } from "./src/env";

const baseURL = "http://localhost:4173";
export default defineConfig({
  baseURL,
  isCI: env.CI,
  webServers: [
    { command: "pnpm build && pnpm preview", url: baseURL },
    {
      command: "pnpm --filter @yas/api dev",
      url: getApiHealthUrl(),
    },
  ],
});

function getApiHealthUrl() {
  const url = new URL(env.apiUrl);
  url.pathname = "/healthz";
  return url.toString();
}
