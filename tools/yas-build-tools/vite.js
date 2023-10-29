const path = require("path");
const react = require("@vitejs/plugin-react");
const { visualizer } = require("rollup-plugin-visualizer");
const { defineConfig } = require("vite");
const { default: checker } = require("vite-plugin-checker");
const { defineEnv } = require("./defineEnv");
const { viteVanillaExtractPlugin } = require("./vanillaExtractPlugin");

function createYasViteConfig(projectRoot, { analyze } = {}) {
  return defineConfig({
    plugins: [
      viteVanillaExtractPlugin(),
      react(),
      checker({ typescript: true }),
      determineVisualizerPlugin(analyze),
    ].filter(Boolean),

    // We use define to opt-out of vite env convention in favor of our own (see yas-env).
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
    template: ["true", "1"].includes(template) ? undefined : template,
    title: `Bundle Analysis: ${packageName}`,
    filename: "dist/bundle-analysis.html",
  });
}

module.exports = { createYasViteConfig };
