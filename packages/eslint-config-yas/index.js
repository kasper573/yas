const fs = require("fs");
const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["import", "unused-imports", "monorepo-cop", "react", "react-hooks"],
  extends: [
    "plugin:monorepo-cop/recommended",
    "plugin:storybook/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  settings: { react: { version: "18.2.0" } },
  rules: {
    // Consistent order of imports makes a modules dependencies easier to grasp mentally for humans
    "import/order": ["error"],
  },
  ignorePatterns: ["node_modules", ".turbo", "dist", "build"],
  // Rules only applied to specific files or file types
  overrides: [
    {
      // Typescript unique rules
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        tsconfigRootDir: path.resolve(__dirname, "../.."),
        alwaysTryTypes: true,
        project: true,
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        // This one is too excessive. Basic use of plenty of libraries causes this one to fail, so it's not worth having it enabled.
        "@typescript-eslint/no-misused-promises": "off",

        // We use TypeScript for type checking, so we don't need prop-types
        "react/prop-types": "off",

        // No-op functions are useful
        "@typescript-eslint/no-empty-function": "off",

        // Automatically removes unused imports. Reduces need for tree shaking in builds.
        "unused-imports/no-unused-imports": "error",
        "@typescript-eslint/no-unused-vars": "off", // Turning off no-unused-vars is recommended by the unused-imports plugin

        // Automatically enforces type-only imports. Reduces need for tree shaking in builds.
        "@typescript-eslint/consistent-type-imports": "warn",

        // This is a convention that we use to ensure that all apps are only depended on via contracts.
        // Depending on runtime code from other apps may lead to extremely unsafe code, i.e.
        // server apps leaking keys, or accidentally bundling server side code into a client bundle.
        // You should instead couple loosely via contracts, which can be done via type imports, which is allowed.
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            paths: getMonorepoAppNames().map((name) => ({
              name,
              message: "Only type definitions may be imported from apps.",
              allowTypeImports: true,
            })),
          },
        ],
      },
    },
    ...require("@yas/env/src/eslintOverrides"),
    {
      files: ["*.js", "*.jsx"],
      rules: {
        // Disable rules for JS files that are only relevant to TypeScript
        "@typescript-eslint/consistent-type-imports": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx", "*.stories.tsx"],
      rules: {
        // Tests are allowed to use non-null assertions since failures in tests are acceptable
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      },
    },
    {
      files: ["*.stories.ts", "*.stories.tsx"],
      rules: {
        // This rule yields false negative errors in storybook stories due to invalid type definitions
        // Rule can be re-enabled once issue is fixed upstream: https://github.com/storybookjs/testing-library/issues/10
        "@typescript-eslint/await-thenable": "off",

        // Storybook stories often use a render prop with anonymous components,
        // which breaks the rules of hooks but is acceptable for storybook
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      // Some tool configs must be CommonJS modules, which means they need to be able to use require()
      files: ["**/eslint-config-yas/index.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};

function getMonorepoAppNames() {
  return fs
    .readdirSync(path.resolve(__dirname, "../../apps"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}
