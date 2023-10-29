import { recipe } from "@yas/css";

export const alertRecipe = recipe({
  base: {
    padding: "#2",
    borderRadius: "#1",
    fontFamily: "inter",
  },
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
