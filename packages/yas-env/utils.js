const path = require("path");
const fs = require("fs");

function getEnvFile(projectRoot) {
  for (const projectRelativeEnvFile of require("./validEnvFiles")) {
    const filepath = path.resolve(projectRoot, projectRelativeEnvFile);
    if (fs.existsSync(filepath)) {
      return filepath;
    }
  }
}

function getReferencesInEnvFile(envFile) {
  if (!envFile) {
    return [];
  }
  const fileContent = fs.readFileSync(envFile, "utf-8");
  const references = fileContent.matchAll(/process\.env\.([A-Z_]+)/g);
  return Array.from(references).map((match) => match[1]);
}

function validateEnv(envFile) {
  if (envFile) {
    try {
      // Import env file to validate the env var values.
      // Our convention is to parse and throw errors when invalid.
      require(path.relative(__dirname, envFile));
      return { valid: true, filepath };
    } catch (error) {
      return { valid: false, filepath, error };
    }
  }
}

module.exports = { getEnvFile, getReferencesInEnvFile, validateEnv };
