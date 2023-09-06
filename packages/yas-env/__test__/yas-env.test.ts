import * as path from "path";
import { describe, expect, it } from "vitest";
import { execaCommandSync } from "execa";

describe("yas-env", () => {
  it("can load value via environment", () => {
    const output = testApp("env-string-min-10", { foo: "input-value" });
    expect(output).toContain("received:input-value");
  });

  it("can load value via flow", () => {
    const output = testApp("flow-string-min-10");
    expect(output).toContain("received:flow-value");
  });

  it("prefers value in environment over flow", () => {
    const output = testApp("flow-string-min-10", {
      foo: "input-value",
    });
    expect(output).toContain("received:input-value");
  });

  it("errors on invalid value", () => {
    const output = testApp("env-string-min-10", {
      foo: "input",
    });
    expect(output).toContain(
      "foo: String must contain at least 10 character(s)",
    );
  });

  it("can expand using external environment variables", () => {
    const output = testApp("env-string-min-10", {
      external: "two",
      foo: "one-${external}-three",
    });
    expect(output).toContain("received:one-two-three");
  });

  it("can expand using internal environment variables", () => {
    const output = testApp("env-foo-bar", {
      bar: "two",
      foo: "one-${bar}-three",
    });
    expect(output).toContain("received:one-two-three");
  });
});

const cliPath = path.resolve(__dirname, "../cli.ts");
function testApp(
  appName: string,
  env: Record<string, string> = {},
  command = "tsx src/main.ts",
) {
  try {
    const { stdout } = execaCommandSync(`${cliPath} ${command}`, {
      cwd: path.join(__dirname, appName),
      env,
    });
    return stdout;
  } catch (error) {
    return String(error);
  }
}
