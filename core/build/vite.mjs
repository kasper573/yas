import * as path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { defineEnv } from "./defineEnv.mjs";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export function createYasViteConfig(
  projectRoot,
  { analyze, useReact = true } = {},
) {
  return defineConfig({
    plugins: [
      vanillaExtractPlugin(),
      useReact && react(),
      checker({ typescript: true }),
      determineVisualizerPlugin(analyze),
    ].filter(Boolean),

    // We use define to opt-out of vite env convention in favor of our own (see @yas/env).
    envPrefix: "_SOMETHING_RIDICULOUS_TO_DISABLE_VITE_ENV_VARS",
    define: defineEnv(projectRoot),
  });
}

function determineVisualizerPlugin(template) {
  if (!template) {
    return;
  }

  const packageName = path.basename(process.cwd());
  return visualizer({
    open: true,
    template: ["true", "1"].includes(String(template)) ? undefined : template,
    title: `Bundle Analysis: ${packageName}`,
    filename: "dist/bundle-analysis.html",
  });
}
