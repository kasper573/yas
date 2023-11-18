import { describe, it, expect } from "@yas/test/vitest/node";
import { hello } from "../src/hello";

describe("Hello", () => {
  it("can say hello", () => {
    expect(hello()).toBe("Hello");
  });
});
