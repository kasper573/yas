module.exports = {
  rules: {
    // Due to frequent use of generics in this library we need to disable these rules
    "@typescript-eslint/no-explicit-any": "off",
    // This rule is too strict for this library
    "yas/disallow-exceptions": "off",
  },
};
