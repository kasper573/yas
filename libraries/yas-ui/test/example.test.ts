import { describe, it, expect } from "@yas/test/vitest/node";
import { example } from "../src/example";

describe("example", () => {
  it("can double 1 to 2", () => {
    expect(example(1)).toBe(2);
  });
});
