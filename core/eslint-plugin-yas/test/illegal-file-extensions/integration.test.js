const path = require("path");
const fs = require("fs");
const { RuleTester } = require("eslint");
const rule = require("../../rules/illegal-file-extensions");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

const testCases = getFoldersAt(__dirname).map(loadTestCase);

ruleTester.run("illegal-file-extensions", rule, {
  valid: testCases.filter((test) => !test.errors),
  invalid: testCases.filter((test) => test.errors),
});

/**
 * @param {string} folderPath
 * @return {RuleTester.InvalidTestCase | RuleTester.ValidTestCase}
 */
function loadTestCase(folderPath) {
  const name = path.basename(folderPath);
  const filename = require.resolve(path.join(folderPath, "code.js"));
  const { options, error } = require(path.join(folderPath, "meta.json"));
  const code = fs.readFileSync(filename, "utf8");
  return {
    name,
    code,
    filename,
    options: [options],
    errors: error ? [{ message: error }] : undefined,
  };
}

function getFoldersAt(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((entry) => path.resolve(dir, entry.name));
}
