import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

export type Color = (typeof colors)[number];
const colors = ["red", "green", "blue"] as const;

export const sprinkles = createSprinkles(
  defineProperties({
    properties: { color: colors },
  }),
);

export type Variants = Exclude<
  RecipeVariants<typeof recipeWithVariants>,
  undefined
>;

export const recipeWithVariants = recipe({
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

export const recipeWithoutVariants = recipe({
  base: {
    color: "red",
  },
});
