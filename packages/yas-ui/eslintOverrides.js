const whatShouldIDoInstead = `Use import {css} from "@yas/ui" instead`;

const disallowDirectUseOfVanillaExtractCss = {
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
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["*.scss", "*.css", "*.sass"],
            message: `Non-typesafe CSS is not allowed. ${whatShouldIDoInstead}`,
          },
        ],
      },
    ],
  },
};

module.exports = [
  disallowDirectUseOfVanillaExtractCss,
  disallowUseOfNonTypescriptCSSFiles,
];
