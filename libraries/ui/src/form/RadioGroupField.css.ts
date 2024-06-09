import { atoms, recipe } from "@yas/style";

export const clearButton = recipe({
  variants: {
    visible: {
      true: atoms({
        opacity: 1,
        transition: "appearance.emphasized.enter",
      }),
      false: atoms({
        opacity: 0,
        transition: "appearance.standard.exit",
      }),
    },
  },
});

export const fieldset = atoms({
  padding: 0,
  border: "none",
});

export const radio = atoms({
  margin: 0,
});
