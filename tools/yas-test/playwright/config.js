import * as path from "path";
import {
  defineConfig as originalDefineConfig,
  devices,
} from "@playwright/test";

function defineConfig({
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
      ["html", { outputFolder: reportDir }],
      isCI && ["github"],
    ].filter(Boolean),
    fullyParallel: true,
    forbidOnly: isCI,
    globalTimeout: 1000 * 60 * 30,
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
      reuseExistingServer: !isCI,
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
  "iPhone 12",
  "iPhone 12 landscape",
];

function projectForDevice(name) {
  return {
    name,
    use: { ...devices[name] },
  };
}

module.exports = { defineConfig };
