const path = require("path");

module.exports = {
  rules: {
    "yas/atomic-module": [
      "error",
      [
        path.resolve(__dirname, "src/form/BaseForm.ts"),
        path.resolve(__dirname, "src/form/composed"),
        path.resolve(__dirname, "src/form"),
        path.resolve(__dirname, "src/form/shared"),
        path.resolve(__dirname, "src/molecules"),
        path.resolve(__dirname, "src/components"),
        path.resolve(__dirname, "src/layout"),
        path.resolve(__dirname, "src/hooks"),
        path.resolve(__dirname, ".storybook"),
        path.resolve(__dirname, "assets"),
      ],
    ],
    // We must use `require` in main.js to load our vite config
    "@typescript-eslint/no-var-requires": "off",
  },
};
