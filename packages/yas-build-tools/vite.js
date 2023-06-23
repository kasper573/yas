const path = require("path");
const react = require("@vitejs/plugin-react");
const { default: env } = require("vite-plugin-environment");
const { visualizer } = require("rollup-plugin-visualizer");
const { expand } = require("dotenv-expand");
const { defineConfig } = require("vite");
const { default: checker } = require("vite-plugin-checker");
const { config } = require("dotenv-flow");

// NOTE This is a JS file because it was much simpler than configuring
// Vite & node to load non-prebuilt ESM files via the workspace:* monorepo directive.

function createYasViteConfig({ analyze = process.env.ANALYZE } = {}) {
  expand(
    config({
      path: path.resolve(__dirname, "../.."),
      default_node_env: "development",
    })
  );

  return defineConfig({
    plugins: [
      react(),
      checker({ typescript: true }),
      determineVisualizerPlugin(analyze),
      env("all"),
    ].filter(Boolean),
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
