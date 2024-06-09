import { atoms, recipe } from "@yas/style";

export const alertRecipe = recipe({
  base: atoms({
    padding: "l",
    borderRadius: "s",
  }),
  variants: {
    severity: {
      success: atoms({
        backgroundColor: "success.base",
        color: "success.face",
      }),
      info: atoms({
        backgroundColor: "info.base",
        color: "info.face",
      }),
      warning: atoms({
        backgroundColor: "warning.base",
        color: "warning.face",
      }),
      error: atoms({
        backgroundColor: "error.base",
        color: "error.face",
      }),
    },
  },
  defaultVariants: {
    severity: "error",
  },
});
