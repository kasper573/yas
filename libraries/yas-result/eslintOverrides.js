const enforceUseOfResultTypes = {
  files: ["*.{ts,tsx}"],
  excludedFiles: ["**/__test__/**"],
  rules: {
    "yas/disallow-exceptions": [
      "error",
      { message: `Use @yas/result instead.` },
    ],
  },
};

module.exports = [enforceUseOfResultTypes];
