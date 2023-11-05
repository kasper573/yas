const { defineConfig, devices } = require("@playwright/experimental-ct-react");
const { createYasViteConfig } = require("@yas/build-tools/vite");

export default defineConfig({
  testDir: "./",
  timeout: 10 * 1000,
  use: {
    ctPort: 3100,
    ctViteConfig: createYasViteConfig(__dirname),
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
