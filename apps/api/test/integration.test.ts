import { describe, it, expect } from "@yas/test/vitest/node";
import { createExampleRouter } from "../src/modules/example/router";

describe("integration", () => {
  it("example module can respond to hello", async () => {
    const example = createExampleRouter().createCaller({});
    const response = await example.hello("hello");
    expect(response).toBe("hello world");
  });
});
