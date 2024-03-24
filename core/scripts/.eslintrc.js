module.exports = {
  rules: {
    // Scripts are allowed to use process.env
    "no-restricted-syntax": "off",
    // Scripts are allowed to use some nasty hacks
    "@typescript-eslint/no-explicit-any": "off",
  },
};
