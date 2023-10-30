const { defineConfig } = require("cypress");
const { createYasViteConfig } = require("@yas/build-tools/vite");

module.exports = defineConfig({
  component: {
    specPattern: "**/*.cy.{ts,tsx}",
    screenshotsFolder: false,
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: createYasViteConfig(__dirname),
    },
  },
});
