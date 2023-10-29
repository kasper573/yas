import { render as renderRoot } from "@testing-library/react";
import { colors } from "./styles/tokens";

describe("vanilla-extract-constrained", () => {
  it("can define valid value", async () => {
    const { validRedColor } = await import("./styles/validRedColor.css");
    const { container } = render(<div className={validRedColor} />);
    expect(container).toHaveStyle({ color: colors.red });
  });

  it("can detect invalid value", async () => {
    await expect(
      () => import("./styles/invalidYellowColor.css"),
    ).rejects.toThrow(
      `"color" has no value "${colors.yellow}". Possible values are "${colors.red}", "${colors.blue}"`,
    );
  });

  it("can define valid aliased value", async () => {
    const { validAliasedRedBackground } = await import(
      "./styles/validAliasedRedBackground.css"
    );
    const { container } = render(<div className={validAliasedRedBackground} />);
    expect(container).toHaveStyle({ background: colors.red });
  });

  it("conditional value uses default when condition is inactive", async () => {
    const { conditionalRedColor } = await import(
      "./styles/conditionalRedColor.css"
    );
    const { container } = render(<div className={conditionalRedColor} />);
    expect(container).toHaveStyle({ color: colors.blue });
  });

  it("conditional value is correct when condition is active", async () => {
    const { conditionalRedColor } = await import(
      "./styles/conditionalRedColor.css"
    );
    const { container } = render(
      <div className={conditionalRedColor} data-condition />,
    );
    expect(container).toHaveStyle({ color: colors.red });
  });

  it("can define multiple properties", async () => {
    const { validRedColorAndGreenBackground } = await import(
      "./styles/validRedColorAndGreenBackground.css"
    );
    const { container } = render(
      <div className={validRedColorAndGreenBackground} />,
    );
    expect(container).toHaveStyle({
      color: colors.red,
      backgroundColor: colors.green,
    });
  });

  it("defining multiple properties yield a single class name", async () => {
    const { validRedColorAndGreenBackground } = await import(
      "./styles/validRedColorAndGreenBackground.css"
    );
    const classNames = validRedColorAndGreenBackground.split(" ");
    expect(classNames).toHaveLength(1);
  });
});

function render(...args: Parameters<typeof renderRoot>) {
  const { container, ...rest } = renderRoot(...args);
  const { firstElementChild } = container;
  if (!firstElementChild) {
    throw new Error("No first element child");
  }
  return {
    container: firstElementChild,
    ...rest,
  };
}
