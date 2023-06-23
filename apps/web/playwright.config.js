import { defineConfig } from "@yas/playwright/preset";

export default defineConfig({
  baseURL: "http://localhost:3002",
  webServers: [
    { command: "pnpm dev", url: "http://localhost:3002" },
    { command: "pnpm --filter api dev", url: "http://localhost:1234/healthz" },
  ],
});
