import { recipe } from "@vanilla-extract/recipes";
import { createRecipeFactory } from "../src";

const createCustomRecipe = createRecipeFactory(
  (style: { color: string }) => style,
);

const props = {
  variants: {
    foo: {
      1: {
        color: "1",
      },
      2: {
        color: "2",
      },
    },
    bar: {
      x: {
        color: "x",
      },
      y: {
        color: "y",
      },
    },
    baz: {
      true: {
        color: "yes",
      },
      false: {
        color: "no",
      },
    },
  },
};

export const regularRecipe = recipe(props);

export const customRecipe = createCustomRecipe(props);
