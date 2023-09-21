import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { recipe } from "@vanilla-extract/recipes";

export const sprinkles = createSprinkles(
  defineProperties({ properties: { color: ["red", "green", "blue"] } }),
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
