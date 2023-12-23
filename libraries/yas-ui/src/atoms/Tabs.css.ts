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
    transition: [[["background", "color"], "standard.beginAndEndOnScreen"]],
    cursor: "pointer",
  },
  variants: {
    active: {
      true: {},
      false: {},
    },
  },
});

const variantClasses = list.classNames.variants.variant;
const activeClasses = item.classNames.variants.active;

globalStyle(`${variantClasses["item-contained"]} ${activeClasses.true}`, {
  background: "info.main",
  color: "info.contrast",
});

for (const variantClass of Object.values(variantClasses)) {
  globalStyle(`${variantClass} ${activeClasses.false}`, {
    color: "info.light",
  });
}

globalStyle(`${variantClasses["contained"]} ${activeClasses.true}`, {
  background: "surface.main",
  color: "surface.contrast",
});
