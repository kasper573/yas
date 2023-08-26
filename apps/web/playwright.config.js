import { defineConfig } from "@yas/playwright/preset";

export default defineConfig({
  baseURL: "http://localhost:3002",
  webServers: [
    { command: "yarn dev", url: "http://localhost:3002" },
    {
      command: "yarn workspace @yas/api dev",
      url: "http://localhost:1234/healthz",
    },
  ],
});
