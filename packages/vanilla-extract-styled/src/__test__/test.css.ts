import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { recipe } from "@vanilla-extract/recipes";

export type Color = (typeof colors)[number];
const colors = ["red", "green", "blue"] as const;

export const sprinkles = createSprinkles(
  defineProperties({
    properties: { color: colors },
  }),
);

export const testRecipe = recipe({
  variants: {
    foo: {
      1: {},
      2: {},
    },
    bar: {
      x: {},
      y: {},
    },
    baz: {
      a: {},
      b: {},
    },
  },
  defaultVariants: {
    baz: "b",
  },
});
