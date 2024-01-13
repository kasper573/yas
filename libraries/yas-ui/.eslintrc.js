const path = require("path");

module.exports = {
  rules: {
    "yas/atomic-module": [
      "error",
      [
        path.resolve(__dirname, "src/form/composed-again"),
        path.resolve(__dirname, "src/form/composed"),
        path.resolve(__dirname, "src/form"),
        path.resolve(__dirname, "src/form/shared"),
        path.resolve(__dirname, "src/organisms"),
        path.resolve(__dirname, "src/components"),
        path.resolve(__dirname, "src/layout"),
        path.resolve(__dirname, ".storybook"),
        path.resolve(__dirname, "assets"),
      ],
    ],
  },
};
