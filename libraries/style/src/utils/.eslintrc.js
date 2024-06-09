module.exports = {
  rules: {
    // Required to define the NoInfer type.
    // Remove this once upgraded to typescript 5.4 (https://devblogs.microsoft.com/typescript/announcing-typescript-5-4-beta/#the-noinfer-utility-type)
    "@typescript-eslint/no-explicit-any": "off",
  },
};
