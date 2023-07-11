module.exports = {
  root: true,
  extends: ["yas"],
  rules: {
    // Due to frequent use of generics in this library we need to disable these rules
    "@typescript-eslint/ban-types": ["error", { types: { "{}": false } }],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
