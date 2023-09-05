const path = require("path");
const react = require("@vitejs/plugin-react");
const { visualizer } = require("rollup-plugin-visualizer");
const { defineConfig } = require("vite");
const { default: checker } = require("vite-plugin-checker");

// NOTE This is a JS file because it was much simpler than configuring
// Vite & node to load non-prebuilt ESM files via the workspace:* monorepo directive.

function createYasViteConfig({ analyze } = {}) {
  return defineConfig({
    plugins: [
      react(),
      checker({ typescript: true }),
      determineVisualizerPlugin(analyze),
    ].filter(Boolean),
    define: exposeEnvToDefine(),
  });
}

// We use define to normalize and use process.env even in vite apps.
// This is to simplify tooling that need to import from our env file convention (see yas-env).

// Note on safety: Since we enforce an env var file convention, we are not as worried about
// accidentally exposing secrets via process.env, since it's really easy to overview what env vars are used.
// And one has to explicitly reference an env var by name to expose it. So just don't expose secrets.

function exposeEnvToDefine() {
  const { env } = process;
  const define = {};
  for (const key in env) {
    define[`process.env.${key}`] = JSON.stringify(env[key]);
  }
  return define;
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
