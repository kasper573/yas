import { defineConfig, devices } from "@playwright/experimental-ct-react";
import { createYasViteConfig } from "@yas/build/vite.mjs";

export default defineConfig({
  testDir: "./",
  timeout: 10 * 1000,
  use: {
    ctPort: 3100,
    ctViteConfig: createYasViteConfig(__dirname),
  },
  // No need to test multiple browsers as there's no runtime differences
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
});
