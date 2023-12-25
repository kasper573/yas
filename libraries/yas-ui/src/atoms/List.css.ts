import { globalStyle, recipe, style } from "@yas/style";

export const list = recipe({
  base: {
    width: "100%",
    m: 0,
    p: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    compact: {
      true: { gap: 1 },
      false: { gap: "#2" },
    },
  },
  defaultVariants: {
    compact: false,
  },
});

export const item = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    gap: "#2",
    alignItems: "center",
    py: "#2",
    px: "#3",
    transition: [[["background", "color"], "standard.enter"]],
  },
  variants: {
    button: {
      true: {
        cursor: "pointer",
        background: { hover: "surface.light", active: "highlight" },
        color: { hover: "surface.contrast", active: "surface.contrast" },
      },
    },
  },
});

const itemContentHeight = 40.5;

export const icon = style({
  height: itemContentHeight,
  width: itemContentHeight,
  minWidth: itemContentHeight,
  minHeight: itemContentHeight,
  boxSizing: "border-box",
});

globalStyle(`${icon} > *`, {
  height: "100%",
  width: "100%",
});

export const secondaryContent = style({
  ml: "auto",
});