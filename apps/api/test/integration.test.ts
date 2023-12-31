import { describe, it, expect } from "@yas/test/vitest/node";
import { createExampleRouter } from "../src/modules/example/router";
import { FakeUserRepository } from "../src/repositories/FakeUserRepository";

describe("integration", () => {
  it("example module can respond to hello", async () => {
    const example = createExampleRouter().createCaller({
      userRepository: new FakeUserRepository(),
    });
    const response = await example.hello("hello");
    expect(response?.message).toBe("hello world");
  });
});
