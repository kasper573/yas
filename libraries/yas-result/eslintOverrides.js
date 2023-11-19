const enforceUseOfResultTypes = {
  files: ["*.{ts,tsx}"],
  excludedFiles: ["**/test/**"],
  rules: {
    "yas/disallow-exceptions": [
      "error",
      { message: `Use @yas/result instead.` },
    ],
  },
};

module.exports = [enforceUseOfResultTypes];
