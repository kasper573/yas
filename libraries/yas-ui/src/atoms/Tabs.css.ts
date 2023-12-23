import { recipe } from "@yas/style";

export const list = recipe({
  base: {
    m: 0,
    p: 0,
    display: "flex",
    flexDirection: "row",
  },
  variants: {
    variant: {
      "item-contained": {},
      "text-highlight": {},
      contained: {},
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
    transition: [[["background", "color"], "standard.enter"]],
  },
  variants: {
    active: {
      true: {
        background: "info.main",
        color: "info.contrast",
      },
    },
  },
});
