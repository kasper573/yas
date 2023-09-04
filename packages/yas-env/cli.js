// This is an encapsulation of dotenv-cli embedded with the default flags of our liking.

insertDotenvCLIFlags({
  "-c": "development",
});

require("dotenv-cli/cli");

function insertDotenvCLIFlags(flags) {
  for (const [name, value] of Object.entries(flags)) {
    process.argv.splice(2, 0, name, String(value));
  }
}
