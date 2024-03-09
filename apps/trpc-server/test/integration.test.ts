import { describe, it, expect } from "@yas/test/vitest/node";
import { FakeUserRepository } from "../src/repositories/FakeUserRepository";
import { t } from "../src/definition/trpc";
import { createApiTesterRouter } from "../src/modules/apiTester";

describe("integration", () => {
  it("server can greet the client", async () => {
    const apiTester = t.createCallerFactory(createApiTesterRouter())({
      userRepository: new FakeUserRepository(),
      clientId: "test-client",
    });
    const response = await apiTester.greeting("Test");
    expect(response).toBe("Hello, Test!");
  });
});
