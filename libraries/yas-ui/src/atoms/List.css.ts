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
      false: { gap: "#2", py: "#2" },
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
    gap: "#3",
    alignItems: "center",
    py: "#2",
    px: "#3",
    transition: [[["background", "color"], "standard.enter"]],
    width: "100%",
    boxSizing: "border-box",
  },
  variants: {
    button: {
      true: {
        cursor: "pointer",
        background: { hover: "info.base.light", active: "highlight" },
        color: { hover: "info.contrast.main", active: "surface.contrast.main" },
      },
    },
  },
});

const itemContentHeight = 40;

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

export const text = style({
  overflow: "hidden",
});

export const textEllipsis = style({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: "100%",
});

export const secondaryContent = style({
  flex: 1,
  ml: "auto",
});
