import * as path from "path";
import { execaCommand } from "execa";
import { describe, it, expect } from "@yas/test/vitest/node";

describe("yas-env", () => {
  it("can load value via environment", async () => {
    const output = await testApp("env-string-min-10", { foo: "input-value" });
    expect(output).toContain("received:input-value");
  });

  it("can load value via flow", async () => {
    const output = await testApp("flow-string-min-10");
    expect(output).toContain("received:flow-value");
  });

  it("prefers value in environment over flow", async () => {
    const output = await testApp("flow-string-min-10", {
      foo: "input-value",
    });
    expect(output).toContain("received:input-value");
  });

  it("errors on invalid value", async () => {
    const output = await testApp("env-string-min-10", {
      foo: "input",
    });
    expect(output).toContain(
      "foo: String must contain at least 10 character(s)",
    );
  });

  it("can expand using external environment variables", async () => {
    const output = await testApp("env-string-min-10", {
      external: "two",
      foo: "one-${external}-three",
    });
    expect(output).toContain("received:one-two-three");
  });

  it("can expand using internal environment variables", async () => {
    const output = await testApp("env-foo-bar", {
      bar: "two",
      foo: "one-${bar}-three",
    });
    expect(output).toContain("received:one-two-three");
  });
});

const cliPath = path.resolve(__dirname, "../cli.ts");
async function testApp(
  appName: string,
  env: Record<string, string> = {},
  command = "tsx src/main.ts",
) {
  try {
    const { stdout } = await execaCommand(`${cliPath} ${command}`, {
      cwd: path.join(__dirname, appName),
      env,
    });
    return stdout;
  } catch (error) {
    return String(error);
  }
}
