const whatShouldIDoInstead = `Use import {css} from "@yas/ui" instead`;

const disallowDirectUseOfVanillaExtractPackage = {
  files: ["*.ts", "*.tsx"],
  excludedFiles: ["**/yas-ui/src/css.ts"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        name: "@vanilla-extract",
        message: whatShouldIDoInstead,
      },
    ],
  },
};

const disallowUseOfNonTypescriptCSSFiles = {
  files: ["*.{ts,tsx,js,jsx}"],
  rules: {
    "yas/disallow-file-extensions": [
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
