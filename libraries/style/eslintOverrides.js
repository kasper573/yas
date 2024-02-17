const disallowUseOfNonTypescriptCSSFiles = {
  files: ["*.{ts,tsx,js,jsx}"],
  rules: {
    "yas/illegal-file-extensions": [
      "error",
      {
        extensions: [".scss", ".css", ".sass", ".less"],
        exceptions: ["node_modules"],
        message: `Non-typesafe CSS is not allowed. Use @yas/style instead.`,
      },
    ],
  },
};

module.exports = [disallowUseOfNonTypescriptCSSFiles];
