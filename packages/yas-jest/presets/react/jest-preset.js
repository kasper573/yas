/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...require("../shared")({
    swcOptions: {
      jsc: {
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
    },
  }),
  testEnvironment: "jsdom",
};
