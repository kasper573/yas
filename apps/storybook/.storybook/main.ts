import * as path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
const { mergeConfig } = require("vite");
const { createYasViteConfig } = require("@yas/build/vite");

const config: StorybookConfig = {
  stories: [{ directory: path.resolve(__dirname, "../src") }],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(builtinConfig) {
    return mergeConfig(
      builtinConfig,
      createYasViteConfig(__dirname, {
        useReact: false, // Already included in storybook
      }),
    );
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
