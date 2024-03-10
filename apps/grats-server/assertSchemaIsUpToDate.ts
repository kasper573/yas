import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import { createHash } from "crypto";

const tsConfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
const tsSchemaFilePath = path.resolve(__dirname, tsConfig.grats.tsSchema);

const command = `pnpm codegen`;
const original = fileChecksum(tsSchemaFilePath);

exec(command, (error) => {
  let exitCode = 0;
  try {
    if (error) {
      throw error;
    }

    const after = fileChecksum(tsSchemaFilePath);
    if (original.checksum !== after.checksum) {
      console.log(
        `❌  Schema is out of date. Please run "${command}" and commit the changes.`,
      );
      exitCode = 1;
    } else {
      console.log("✅  Schema is up to date!");
    }
  } finally {
    fs.writeFileSync(tsSchemaFilePath, original.content);
  }

  process.exit(exitCode);
});

function fileChecksum(filePath: string) {
  const content = fs.readFileSync(filePath);
  const checksum = createHash("sha256").update(content).digest("hex");
  return { content, checksum };
}
