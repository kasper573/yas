import type { RecipeVariants } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

export type Color = (typeof colors)[number];
const colors = ["red", "green", "blue"] as const;

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

export const blueColorRecipe = recipe(
  {
    base: {
      color: "blue",
    },
  },
  "blue",
);

export const greenColorRecipe = recipe(
  {
    base: {
      color: "green",
    },
  },
  "green",
);
