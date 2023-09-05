import { defineConfig } from "@yas/playwright/preset";
import { env } from "./src/env";

export default defineConfig({
  baseURL: "http://localhost:3002",
  isCI: env.CI,
  webServers: [
    { command: "pnpm dev", url: "http://localhost:3002" },
    {
      command: "pnpm --filter @yas/api dev",
      url: "http://localhost:1234/healthz",
    },
  ],
});
