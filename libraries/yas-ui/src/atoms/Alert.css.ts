import { recipe } from "@yas/css";

export const alertRecipe = recipe({
  base: {
    padding: "#2",
    borderRadius: "#1",
    fontFamily: "default",
  },
  variants: {
    variant: {
      success: {
        background: "successMain",
        color: "successContrast",
      },
      info: {
        background: "infoMain",
        color: "infoContrast",
      },
      warning: {
        background: "warningMain",
        color: "warningContrast",
      },
      error: {
        background: "errorMain",
        color: "errorContrast",
      },
    },
  },
});
