// @ts-check

const envFiles = require("./validEnvFiles");

const ext = ".{js,jsx,ts,tsx}";

const testFiles = [`**/__test__/**/*${ext}`, `**/*.test${ext}`];

const requireEnvFile = {
  files: [`apps/**/*${ext}`],
  excludedFiles: [...envFiles.map((file) => `**/${file}`), ...testFiles],
  rules: rulesForBanningEnvUsage(
    `yas-env: Apps must only read from the environment inside their env file (${envFiles.join(
      ", ",
    )})`,
  ),
};

const disallowEnvEntirely = {
  files: ["{libraries,core}/**/*.{js,jsx,ts,tsx}"],
  excludedFiles: testFiles,
  rules: rulesForBanningEnvUsage(
    "yas-env: Packages may not access environment variables at all and should instead rely on dependency injection.",
  ),
};

module.exports = [requireEnvFile, disallowEnvEntirely];

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
          "yas-env: We do not use import.meta.env. Use process.env instead.",
      },
    ],
  };
}
