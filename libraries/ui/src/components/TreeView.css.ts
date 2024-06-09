import { atoms, recipe } from "@yas/style";

export const list = recipe({
  base: atoms({
    all: "unset",
    display: "flex",
    flexDirection: "column",
    pl: "xl",
  }),
  variants: {
    expanded: {
      true: {},
      false: atoms({ display: "none" }),
    },
  },
});

export const listItem = atoms({
  all: "unset",
  display: "flex",
  flexDirection: "column",
});

export const labelAndIcon = atoms({
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "s",
});

export const label = atoms({
  typography: "body",
});
