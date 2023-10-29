import { render } from "@testing-library/react";

describe("vanilla-extract-constrained", () => {
  it("can define valid value", async () => {
    const { validRedColor } = await import("./fixtures/validRedColor.css");
    const { getByText } = render(
      <div className={validRedColor}>Hello World</div>,
    );
    expect(getByText("Hello World")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("can detect invalid value", async () => {
    await expect(
      () => import("./fixtures/invalidYellowColor.css"),
    ).rejects.toThrow(
      `"color" has no value "yellow". Possible values are "red", "blue"`,
    );
  });
});
