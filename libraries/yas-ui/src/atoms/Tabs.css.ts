import { globalStyle, recipe } from "@yas/style";

export const list = recipe({
  base: {
    m: 0,
    p: 0,
    display: "flex",
    flexDirection: "row",
    listStyle: "none",
  },
  variants: {
    variant: {
      "item-contained": {},
      "text-highlight": {},
      contained: {
        borderRadius: "#3",
        padding: "#1",
        background: "surface.dark",
      },
    },
  },
  defaultVariants: {
    variant: "item-contained",
  },
});

export const item = recipe({
  base: {
    borderRadius: "#3",
    px: "#3",
    py: "#1",
    transition: [[["background", "color"], "emphasized.beginAndEndOnScreen"]],
    cursor: "pointer",
  },
  variants: {
    active: {
      true: {},
      false: {},
    },
  },
});

globalStyle(
  `${list.classNames.variants.variant["item-contained"]} ${item.classNames.variants.active.true}`,
  {
    background: "info.main",
    color: "info.contrast",
  },
);

globalStyle(
  `${list.classNames.variants.variant["text-highlight"]} ${item.classNames.variants.active.false}`,
  { color: "info.light" },
);

globalStyle(
  `${list.classNames.variants.variant["contained"]} ${item.classNames.variants.active.true}`,
  {
    background: "surface.main",
    color: "surface.contrast",
  },
);
