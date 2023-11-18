const whatShouldIDoInstead = `Use "@yas/validate" instead`;

const disallowDirectUseOfZodPackage = {
  files: ["*.ts", "*.tsx"],
  excludedFiles: ["**/yas-zod/**"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "zod",
            message: whatShouldIDoInstead,
          },
        ],
      },
    ],
  },
};

module.exports = [disallowDirectUseOfZodPackage];
