import { recipe, style } from "@yas/style";

export const clearButton = recipe({
  variants: {
    visible: {
      true: { opacity: 1, transition: [["opacity", "emphasized.enter"]] },
      false: { opacity: 0, transition: [["opacity", "standard.exit"]] },
    },
  },
});

export const fieldset = style({
  padding: 0,
  border: "none",
});

export const radio = style({
  margin: 0,
});
