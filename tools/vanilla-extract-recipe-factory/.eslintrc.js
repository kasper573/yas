module.exports = {
  root: true,
  extends: ["yas"],
  rules: {
    // Due to important edge case use of generics in this library we need to disable these rules
    "@typescript-eslint/no-explicit-any": "off",
  },
};
