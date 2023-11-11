import { expectTypeOf } from "vitest";
import { defineProperties } from "../index";
import type { ConstrainedPropertyValue } from "../resolveStyle";

it("can infer direct property value types", () => {
  const props = defineProperties({
    properties: {
      color: ["red", "green"],
    },
  } as const);

  type Value = ConstrainedPropertyValue<[typeof props], "color">;

  expectTypeOf<Value>().toMatchTypeOf<"red" | "green">();
});

it("can infer aliased property value types", () => {
  const props = defineProperties({
    properties: {
      color: {
        failure: "red",
        success: "green",
      },
    },
  });

  type Value = ConstrainedPropertyValue<[typeof props], "color">;

  expectTypeOf<Value>().toMatchTypeOf<"failure" | "success">();
});
