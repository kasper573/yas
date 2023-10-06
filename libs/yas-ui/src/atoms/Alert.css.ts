import { recipe } from "@yas/css";

export const alertRecipe = recipe({
  variants: {
    variant: {
      success: {
        background: "success",
      },
      info: {
        background: "info",
      },
      warning: {
        background: "warning",
      },
      error: {
        background: "error",
      },
    },
  },
});
