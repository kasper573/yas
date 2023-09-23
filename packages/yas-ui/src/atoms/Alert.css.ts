import { recipe } from "../styling/css";

export const alertRecipe = recipe({
  variants: {
    variant: {
      success: {
        backgroundColor: "green",
      },
      info: {
        backgroundColor: "blue",
      },
      warning: {
        backgroundColor: "yellow",
      },
      error: {
        backgroundColor: "red",
      },
    },
  },
});
