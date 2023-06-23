const cp = require("child_process");

function runTypescriptFile(file) {
  file = file.replaceAll(/\\/g, "/");
  try {
    cp.execSync(`ts-node "${file}"`, { stdio: "inherit" });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

module.exports = { runTypescriptFile };
