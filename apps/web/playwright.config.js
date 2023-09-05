import { defineConfig } from "@yas/playwright/preset";

export default defineConfig({
  baseURL: "http://localhost:3002",
  // Remove this eslint-disable when this is fixed: https://github.com/ksandin/yas/issues/58
  // eslint-disable-next-line no-restricted-syntax
  isCI: !!process.env.CI,
  webServers: [
    { command: "pnpm dev", url: "http://localhost:3002" },
    {
      command: "pnpm --filter @yas/api dev",
      url: "http://localhost:1234/healthz",
    },
  ],
});
