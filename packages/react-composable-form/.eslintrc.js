module.exports = {
  extends: ["yas"],
  rules: {
    // Due to frequent use of generics in this library we need to disable these rules
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // Required for reactFastRefresh test
    "@typescript-eslint/no-var-requires": "off",
  },
};
