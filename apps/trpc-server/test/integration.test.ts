import { describe, it, expect } from "@yas/test/vitest/node";
import { createExampleRouter } from "../src/modules/example/router";
import { FakeUserRepository } from "../src/repositories/FakeUserRepository";
import { t } from "../src/definition/trpc";

describe("integration", () => {
  it("server can greet the client", async () => {
    const example = t.createCallerFactory(createExampleRouter())({
      userRepository: new FakeUserRepository(),
      clientId: "test-client",
    });
    const response = await example.greeting("Test");
    expect(response).toBe("Hello, Test!");
  });
});
