import { recipe } from "@yas/style";

export const alertRecipe = recipe({
  base: {
    padding: "#2",
    borderRadius: "#1",
    fontFamily: "default",
  },
  variants: {
    severity: {
      success: {
        background: "success.main",
        color: "success.contrast",
      },
      info: {
        background: "info.main",
        color: "info.contrast",
      },
      warning: {
        background: "warning.main",
        color: "warning.contrast",
      },
      error: {
        background: "error.main",
        color: "error.contrast",
      },
    },
  },
});
