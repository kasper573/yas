const path = require("path");
const react = require("@vitejs/plugin-react");
const { visualizer } = require("rollup-plugin-visualizer");
const { defineConfig } = require("vite");
const { default: checker } = require("vite-plugin-checker");
const { loadEnv } = require("@yas/env/utils");

// NOTE This is a JS file because it was much simpler than configuring
// Vite & node to load non-prebuilt ESM files via the workspace:* monorepo directive.

function createYasViteConfig({ analyze } = {}) {
  return defineConfig({
    plugins: [
      react(),
      checker({ typescript: true }),
      determineVisualizerPlugin(analyze),
    ].filter(Boolean),

    // We use define to normalize and use process.env even in vite apps.
    // This is to simplify tooling that need to import from our env file convention (see yas-env).
    // We automatically expose all env variables that are referenced in the env file.
    define: loadEnv(process.cwd(), (key, value) => [
      `process.env.${key}`,
      JSON.stringify(value),
    ]),
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
