const path = require("path");
const react = require("@vitejs/plugin-react");
const { default: env } = require("vite-plugin-environment");
const { visualizer } = require("rollup-plugin-visualizer");
const { expand } = require("dotenv-expand");
const { defineConfig } = require("vite");
const { default: checker } = require("vite-plugin-checker");

// NOTE This is a JS file because it was much simpler than configuring
// Vite & node to load non-prebuilt ESM files via the workspace:* monorepo directive.

function createYasViteConfig({ analyze = process.env.ANALYZE } = {}) {
  // Vite's built-in expansion only uses locally defined env vars.
  // We want to be able to use all env vars, so we use dotenv-expand manually.
  expand({ parsed: process.env });

  return defineConfig({
    envDir: path.resolve(__dirname, "../../"),
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
