import { recipe } from "@yas/style";

export const tabs = recipe({
  base: {
    m: 0,
    p: 0,
    display: "flex",
    flexDirection: "row",
    listStyle: "none",
    maxWidth: "100%",
    boxSizing: "border-box",

    // TODO replace with ScrollArea
    overflowX: "auto",
  },
  variants: {
    variant: {
      "item-contained": {},
      "text-highlight": {},
      contained: {
        borderRadius: "#3",
        padding: "#1",
        background: "info.base.main",
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
    transition: [[["background", "color"], "standard.beginAndEndOnScreen"]],
    cursor: "pointer",
    px: "#3",
    py: "#1",
  },
  variants: {
    active: {
      true: {
        selectors: {
          [`${variantClasses["item-contained"]} &`]: {
            background: "info.base.main",
            color: "info.contrast.main",
          },
          [`${variantClasses["contained"]} &`]: {
            background: "info.contrast.main",
            color: "info.base.main",
          },
        },
      },
    },
  },
});
