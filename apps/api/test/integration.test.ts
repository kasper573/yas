import { describe, it, expect } from "@yas/test/vitest/node";
import { createApiRouter } from "../src/router";

describe("integration", () => {
  it("example module can respond to hello", async () => {
    const caller = createApiRouter().createCaller({});
    const response = await caller.example.hello("hello");
    expect(response).toBe("hello world");
  });
});
