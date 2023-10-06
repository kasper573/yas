import { createRecipeFactory } from "../src";

const customRecipe = createRecipeFactory(
  (style: { custom: string }) => "whatever",
);

export const testRecipe = customRecipe({
  variants: {
    foo: {
      1: {
        custom: "1",
      },
      2: {
        custom: "2",
      },
    },
    bar: {
      x: {
        custom: "x",
      },
      y: {
        custom: "y",
      },
    },
  },
});
