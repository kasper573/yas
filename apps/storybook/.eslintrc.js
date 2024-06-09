module.exports = {
  rules: {
    // We must use `require` in main.js to load our vite config
    "@typescript-eslint/no-var-requires": "off",
    // Must use import.meta.env in storybook
    "no-restricted-syntax": "off",
  },
};
