const path = require("path");
const { expand } = require("dotenv-expand");
const { config } = require("dotenv-flow");

expand(
  config({
    path: path.resolve(__dirname, "../.."),
    default_node_env: "development",
  })
);
