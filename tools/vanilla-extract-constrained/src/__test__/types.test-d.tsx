import { expectTypeOf } from "vitest";

it("inherits props of element", () => {
  type A = number;
  type B = string;

  expectTypeOf<A>().not.toMatchTypeOf<B>();
});
