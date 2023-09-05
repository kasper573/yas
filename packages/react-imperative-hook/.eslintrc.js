module.exports = {
  extends: ["yas"],
  rules: {
    // Due to frequent use of generics in this library we need to disable these rules
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": [
      "error",
      { types: { "{}": false }, extendDefaults: true },
    ],
  },
};
