const enforceUseOfResultTypes = {
  files: ["*.{ts,tsx}"],
  excludedFiles: ["**/__test__/**"],
  rules: {
    "neverthrow/must-use-result": "error",
    "yas/disallow-exceptions": [
      "error",
      { message: `Use @yas/result instead.` },
    ],
  },
};

module.exports = [enforceUseOfResultTypes];
