import { atoms, recipe, theme } from "@yas/style";

export const tabs = recipe({
  base: atoms({
    m: 0,
    p: 0,
    display: "flex",
    flexDirection: "row",
    listStyle: "none",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowX: "auto",
  }),
  variants: {
    intent: {
      "item-contained": {},
      "text-highlight": {},
      contained: atoms({
        borderRadius: "l",
        padding: "s",
        backgroundColor: "info.base",
      }),
    },
  },
  defaultVariants: {
    intent: "item-contained",
  },
});

const variantClasses = tabs.classNames.variants.intent;

export const item = recipe({
  base: [
    atoms({
      borderRadius: "l",
      transition: "appearance.standard.beginAndEndOnScreen",
      cursor: "pointer",
      px: "l",
      py: "s",
    }),
    {
      selectors: activeStyleSelectors(
        (prefix) => `${prefix}[data-status="active"]`, // Tanstack router Link integration
      ),
    },
  ],
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
      background: theme.color.info.base,
      color: theme.color.info.face,
    },
    [transformSelector(`${variantClasses["contained"]} &`)]: {
      background: theme.color.info.face,
      color: theme.color.info.base,
    },
    [transformSelector(`${variantClasses["text-highlight"]} &`)]: {
      fontWeight: "bold",
    },
  } as const;
}
