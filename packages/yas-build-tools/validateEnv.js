#!/usr/bin/env node
const path = require("path");
const { runTypescriptFile } = require("./runTypescriptFile");

runTypescriptFile(path.resolve(__dirname, "./validateEnv.ts"));
