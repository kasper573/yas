import { expectTypeOf } from "vitest";
import { defineProperties } from "../index";
import type { ConstrainedPropertyInput } from "../resolveStyle";

it("can infer direct property value types", () => {
  const props = defineProperties({
    properties: {
      color: ["red", "green"],
    },
  } as const);

  type Value = ConstrainedPropertyInput<[typeof props], "color">;

  expectTypeOf<Value>().toEqualTypeOf<"red" | "green">();
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

  type Value = ConstrainedPropertyInput<[typeof props], "color">;

  expectTypeOf<Value>().toEqualTypeOf<"failure" | "success">();
});

it("can infer conditional direct property value types", () => {
  const props = defineProperties({
    conditions: {
      default: {},
      hover: { selector: "&:hover" },
    },
    properties: {
      color: ["red", "green"],
    },
  } as const);

  type Value = ConstrainedPropertyInput<[typeof props], "color">;

  expectTypeOf<Value>().toEqualTypeOf<
    WithConditions<"red" | "green", "default" | "hover">
  >();
});

it("can infer conditional aliased property value types", () => {
  const props = defineProperties({
    conditions: {
      default: {},
      hover: { selector: "&:hover" },
    },
    properties: {
      color: {
        failure: "red",
        success: "green",
      },
    },
  });

  type Value = ConstrainedPropertyInput<[typeof props], "color">;

  expectTypeOf<Value>().toEqualTypeOf<
    WithConditions<"failure" | "success", "default" | "hover">
  >();
});

type WithConditions<T, Conditions extends string> =
  | T
  | { [K in Conditions]?: T };
