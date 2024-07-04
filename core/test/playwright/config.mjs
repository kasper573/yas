import * as path from "path";
import {
  defineConfig as originalDefineConfig,
  devices,
} from "@playwright/test";

export function defineConfig({
  baseURL,
  isCI,
  testAllProjects = isCI,
  webServers = [],
}) {
  /**
   * @type {import('@playwright/test').PlaywrightTestConfig}
   */
  const config = {
    testDir,
    outputDir: artifactsDir,
    snapshotDir,
    reporter: [
      ["html", { outputFolder: reportDir, open: "never" }],
      isCI && ["github"],
    ].filter(Boolean),
    fullyParallel: true,
    forbidOnly: isCI,
    globalTimeout: 1000 * 60 * 10,
    expect: {
      // Sometimes the CI agent is slow when we have a large amount of test permutations,
      // which can cause some runs to fail due to slow response times from our web or api servers.
      // Raising the expect timeout in CI reduces flakiness at the expense of slightly longer CI runs
      // (keep in mind that only a minimal number of permutations actually will utilize this longer timeout)
      timeout: isCI ? 1000 * 30 : undefined,
    },
    use: {
      baseURL,
      trace: "retain-on-failure",
      screenshot: "only-on-failure",
      video: "retain-on-failure",
    },

    projects: testAllProjects
      ? devicesToTest.map(projectForDevice)
      : [projectForDevice(devicesToTest[0])],

    webServer: webServers.map((server) => ({
      reuseExistingServer: true,
      ...server,
    })),
  };

  return originalDefineConfig(config);
}

const testDir = "./playwright";
const outputDir = ".playwright"; // Same value should also be defined in .gitignore
const artifactsDir = path.join(outputDir, "artifacts");
const snapshotDir = path.join(outputDir, "snapshots");
const reportDir = path.join(outputDir, "report");

/**
 * @type {Array<keyof import('playwright-core').Devices>}
 */
const devicesToTest = [
  "Desktop Chrome",
  "Desktop Firefox",
  "Desktop Safari",
  "Desktop Edge",
  "iPad Pro 11",
  "iPad Pro 11 landscape",
  "Pixel 7",
  // Cannot reliably rest webkit mobile devices due to https://github.com/microsoft/playwright/issues/21784
  // "iPhone 13",
  // Test suite currently does not support mobile landscape mode because the test code isn't responsive
  // "iPhone 13 landscape",
];

function projectForDevice(name) {
  return {
    name,
    use: { ...devices[name] },
  };
}
