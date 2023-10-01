const whatShouldIDoInstead = `Use import {<something>} from "@yas/css" instead`;

const disallowDirectUseOfVanillaExtractPackage = {
  files: ["*.ts", "*.tsx"],
  excludedFiles: ["**/yas-ui/src/styling/**"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@vanilla-extract/*"],
            message: whatShouldIDoInstead,
          },
        ],
      },
    ],
  },
};

const disallowUseOfNonTypescriptCSSFiles = {
  files: ["*.{ts,tsx,js,jsx}"],
  rules: {
    "yas/illegal-file-extensions": [
      "error",
      {
        extensions: [".scss", ".css", ".sass", ".less"],
        exceptions: ["node_modules"],
        message: `Non-typesafe CSS is not allowed. ${whatShouldIDoInstead}`,
      },
    ],
  },
};

module.exports = [
  disallowDirectUseOfVanillaExtractPackage,
  disallowUseOfNonTypescriptCSSFiles,
];
