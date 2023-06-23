import { hello } from "./hello";

describe("Hello", () => {
  it("can say hello", () => {
    expect(hello()).toBe("Hello");
  });
});
