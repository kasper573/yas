import { describe, it, expect } from "@yas/test/vitest/node";
import { createExampleRouter } from "../src/modules/example/router";
import { FakeUserRepository } from "../src/repositories/FakeUserRepository";

describe("integration", () => {
  it("server can greet the client", async () => {
    const example = createExampleRouter().createCaller({
      userRepository: new FakeUserRepository(),
    });
    const response = await example.greeting("Test");
    expect(response).toBe("Hello, Test!");
  });
});
