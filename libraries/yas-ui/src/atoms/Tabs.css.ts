import { recipe } from "@yas/style";

export const tabs = recipe({
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

const variantClasses = tabs.classNames.variants.variant;

export const item = recipe({
  base: {
    borderRadius: "#3",
    px: "#3",
    py: "#1",
    transition: [[["background", "color"], "standard.beginAndEndOnScreen"]],
    cursor: "pointer",
  },
  variants: {
    active: {
      true: {
        selectors: {
          [`${variantClasses["item-contained"]} &`]: {
            background: "info.main",
            color: "info.contrast",
          },
          [`${variantClasses["contained"]} &`]: {
            background: "surface.main",
            color: "surface.contrast",
          },
        },
      },
      false: {
        color: "info.light",
      },
    },
  },
});
