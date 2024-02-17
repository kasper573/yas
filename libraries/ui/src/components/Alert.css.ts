import { recipe } from "@yas/style";

export const alertRecipe = recipe({
  base: {
    padding: "#2",
    borderRadius: "#1",
  },
  variants: {
    severity: {
      success: {
        background: "success.base.main",
        color: "success.contrast.main",
      },
      info: {
        background: "info.base.main",
        color: "info.contrast.main",
      },
      warning: {
        background: "warning.base.main",
        color: "warning.contrast.main",
      },
      error: {
        background: "error.base.main",
        color: "error.contrast.main",
      },
    },
  },
  defaultVariants: {
    severity: "error",
  },
});
