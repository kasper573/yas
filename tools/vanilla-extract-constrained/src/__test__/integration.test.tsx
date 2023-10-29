import { render } from "@testing-library/react";
import { colors } from "./fixtures/tokens";

describe("vanilla-extract-constrained", () => {
  it("can define valid value", async () => {
    const { validRedColor } = await import("./fixtures/validRedColor.css");
    const { getByText } = render(
      <div className={validRedColor}>Hello World</div>,
    );
    expect(getByText("Hello World")).toHaveStyle({ color: colors.red });
  });

  it("can detect invalid value", async () => {
    await expect(
      () => import("./fixtures/invalidYellowColor.css"),
    ).rejects.toThrow(
      `"color" has no value "${colors.yellow}". Possible values are "${colors.red}", "${colors.blue}"`,
    );
  });

  it("can define valid aliased value", async () => {
    const { validAliasedRedBackground } = await import(
      "./fixtures/validAliasedRedBackground.css"
    );
    const { getByText } = render(
      <div className={validAliasedRedBackground}>Hello World</div>,
    );
    expect(getByText("Hello World")).toHaveStyle({ background: colors.red });
  });

  it("conditional value is correct when condition is active", async () => {
    const { conditionalRedColor } = await import(
      "./fixtures/conditionalRedColor.css"
    );
    const { getByText } = render(
      <div className={conditionalRedColor} data-condition>
        Hello World
      </div>,
    );
    expect(getByText("Hello World")).toBe(colors.red);
  });

  it("can define multiple properties", async () => {
    const { validRedColorAndGreenBackground } = await import(
      "./fixtures/validRedColorAndGreenBackground.css"
    );
    const { getByText } = render(
      <div className={validRedColorAndGreenBackground}>Hello World</div>,
    );
    expect(getByText("Hello World")).toHaveStyle({
      color: colors.red,
      backgroundColor: colors.green,
    });
  });

  it("defining multiple properties yield a single class name", async () => {
    const { validRedColorAndGreenBackground } = await import(
      "./fixtures/validRedColorAndGreenBackground.css"
    );
    const classNames = validRedColorAndGreenBackground.split(" ");
    expect(classNames).toHaveLength(1);
  });
});
