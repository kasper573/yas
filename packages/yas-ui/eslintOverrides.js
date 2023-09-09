const disallowDirectUseOfVanillaExtractCss = {
  files: ["*.ts", "*.tsx"],
  excludedFiles: ["**/yas-ui/src/css.ts"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        name: "@vanilla-extract",
        message: `Use import {css} from "@yas/ui" instead`,
      },
    ],
  },
};

module.exports = [disallowDirectUseOfVanillaExtractCss];
