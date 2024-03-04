import * as path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
const { createYasViteConfig } = require("@yas/build/vite.mjs");

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "storybook-addon-variants",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(storybookBuiltinViteConfig) {
    const ourConfig = createYasViteConfig(path.resolve(__dirname, ".."), {
      useReact: false,
      analyze: false,
    });
    return mergeConfig(storybookBuiltinViteConfig, ourConfig);
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
