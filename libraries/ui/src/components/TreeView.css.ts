import { recipe, style } from "@yas/style";

export const list = recipe({
  base: {
    all: "unset",
    display: "flex",
    flexDirection: "column",
    pl: "#4",
  },
  variants: {
    expanded: {
      true: {},
      false: {
        display: "none",
      },
    },
  },
});

export const listItem = style({
  all: "unset",
  display: "flex",
  flexDirection: "column",
});

export const labelAndIcon = style({
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "#1",
});

export const label = style({
  typography: "body",
});
