const fs = require("fs");
const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
    "unused-imports",
    "monorepo-cop",
    "react",
    "react-hooks",
    "yas",
  ],
  extends: [
    "plugin:monorepo-cop/recommended",
    "plugin:storybook/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:eslint-comments/recommended",
    "prettier",
  ],
  settings: { react: { version: "18.2.0" } },
  rules: {
    // Disallow the use of eslint comments to disable rules
    "eslint-comments/no-use": ["error", { allow: [] }],

    // Consistent order of imports makes a modules dependencies easier to grasp mentally for humans
    "import/order": ["error"],

    // Extra strict react rules
    "react/function-component-definition": [
      "error",
      { namedComponents: "function-declaration" },
    ],
    "react/self-closing-comp": ["error"],
    "react/jsx-boolean-value": ["error"],
    "react/jsx-curly-brace-presence": ["error"],
    "react/jsx-fragments": ["error"],
    "react/jsx-no-leaked-render": ["error"],
    "react/jsx-no-useless-fragment": ["error"],
    "react/jsx-pascal-case": ["error"],
    "react/no-danger": ["error"],
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
      extends: ["plugin:@typescript-eslint/strict"],
      rules: {
        // Disabling the type system is a bad ieda
        "yas/no-as-never": "error",

        "yas/graphql-variable-names": [
          "error",
          {
            variableNameCode: ((op) =>
              `${op[0].toLowerCase()}${op.substring(1)}GQL`).toString(),
          },
        ],

        // It's okay to enable the type checker, but not to disable it
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-check": false,
            "ts-expect-error": true,
            "ts-ignore": true,
            "ts-nocheck": true,
          },
        ],

        // For a lot of our libraries, we actually want to use {} as the empty set when working with generics.
        "@typescript-eslint/ban-types": [
          "error",
          { types: { "{}": false }, extendDefaults: true },
        ],

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

        // void is still useful in generics and type utilities
        "@typescript-eslint/no-invalid-void-type": "off",

        // This rule is too strict. Why would dynamic deletes on objects be bad,
        // and dynamic deletes on Maps and Arrays be fine?
        "@typescript-eslint/no-dynamic-delete": "off",
      },
    },
    {
      files: ["*.js", "*.jsx"],
      rules: {
        // Disable rules for JS files that are only relevant to TypeScript
        "@typescript-eslint/consistent-type-imports": "off",
      },
    },
    {
      files: [
        "*.test.ts",
        "*.test.tsx",
        "*.test-d.ts",
        "*.test-d.tsx",
        "*.stories.tsx",
        "**/test/**",
      ],
      rules: {
        // Tests are allowed to use non-null assertions since failures in tests are acceptable
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",

        // Allow ts-expect-error comments in test files, but require descriptions
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-check": false,
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": true,
          },
        ],
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

    ...yasEnvOverrides(),

    // Disallow use of non typescript css files
    {
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
    },

    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      excludedFiles: [
        // We don't enforce encapsulation rules in incubations because incubations are supposed to be
        // moved to separate repositories eventually, so they should depend on whatever packages they want
        "**/incubations/**",
        // Ignore docs/src/env.js because it's has be able to be used inside of docusaurus.config.js,
        // which doesn't support @yas/validate (can't be used in javascript)
        "**/docs/src/env.js",
      ],
      rules: {
        // List of encapsulated libraries
        "yas/encapsulate-dependency": [
          "error",
          {
            "@yas/style": "@vanilla-extract/css",
            "@yas/style": "@vanilla-extract/recipes",
            "@yas/style": "@vanilla-extract/dynamic",
            "@yas/time": "date-fns",
            "@yas/hooks": "usehooks-ts",
            "@yas/icons": "@radix-ui/react-icons",
            "@yas/validate": "zod",
          },
        ],
      },
    },
  ],
};

function getMonorepoAppNames() {
  const appsDir = path.resolve(__dirname, "../../apps");
  return fs
    .readdirSync(appsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .map((folderName) => {
      const packageJsonPath = path.resolve(appsDir, folderName, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      return packageJson.name;
    });
}

function yasEnvOverrides() {
  const validEnvFiles = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../env/validEnvFiles.json"),
      "utf-8",
    ),
  );
  const ext = ".{js,jsx,ts,tsx}";

  const testFiles = [`**/test/**/*${ext}`, `**/*.test${ext}`];

  const requireEnvFile = {
    files: [`apps/**/*${ext}`],
    excludedFiles: [...validEnvFiles.map((file) => `**/${file}`), ...testFiles],
    rules: rulesForBanningEnvUsage(
      `@yas/env: Apps must only read from the environment inside their env file (${validEnvFiles.join(
        ", ",
      )})`,
    ),
  };

  const disallowEnvEntirely = {
    files: ["{libraries,core}/**/*.{js,jsx,ts,tsx}"],
    excludedFiles: testFiles,
    rules: rulesForBanningEnvUsage(
      "@yas/env: Packages may not access environment variables at all and should instead rely on dependency injection.",
    ),
  };

  return [requireEnvFile, disallowEnvEntirely];

  /**
   * @param {string} conventionMessage
   */
  function rulesForBanningEnvUsage(conventionMessage) {
    return {
      "no-restricted-syntax": [
        "error",
        // Disallow use of process.env in favor of env file convention
        {
          selector: `MemberExpression[object.type="process"][property.name="env"]`,
          message: conventionMessage,
        },
        {
          selector: `MemberExpression[object.name="process"][property.name="env"]`,
          message: conventionMessage,
        },
        // Disallow import.meta.env
        {
          selector: `MemberExpression[object.type="MetaProperty"][object.meta.name="import"][property.name="env"]`,
          message:
            "@yas/env: We do not use import.meta.env. Use process.env instead.",
        },
      ],
    };
  }
}
