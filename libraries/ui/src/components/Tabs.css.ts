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
    selectors: activeStyleSelectors(
      (prefix) => `${prefix}[data-status="active"]`, // Tanstack router Link integration
    ),
  },
  variants: {
    active: {
      true: {
        selectors: activeStyleSelectors(),
      },
    },
  },
});

function activeStyleSelectors(
  transformSelector = (selector: string) => selector,
) {
  return {
    [transformSelector(`${variantClasses["item-contained"]} &`)]: {
      background: "info.base.main",
      color: "info.contrast.main",
    },
    [transformSelector(`${variantClasses["contained"]} &`)]: {
      background: "info.contrast.main",
      color: "info.base.main",
    },
    [transformSelector(`${variantClasses["text-highlight"]} &`)]: {
      fontWeight: "bold",
    },
  } as const;
}
