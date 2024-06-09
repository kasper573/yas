import { recipe, atoms, cssForParagraphSpacing } from "@yas/style";
import { keysOf, mapValues, tokens } from "@yas/design-tokens";

export const textRecipe = recipe({
  base: atoms({ all: "unset" }),
  variants: {
    intent: mapValues(tokens.typography, (_, typography) =>
      atoms({ typography }),
    ),
    /**
     * Enables the intent specific margin. Commonly used for paragraph spacing.
     */
    margin: {
      true: {},
    },
    /**
     * Disables the intent specific line height. Commonly used for single line text.
     */
    compact: {
      true: [atoms({ whiteSpace: "nowrap" }), { lineHeight: "1em" }],
    },
    overflow: {
      visible: {},
      clip: atoms({ textOverflow: "clip", overflow: "hidden" }),
      ellipsis: atoms({ textOverflow: "ellipsis", overflow: "hidden" }),
    },
    inline: {
      true: atoms({ display: "inline" }),
      false: atoms({ display: "block" }),
    },
  },
  compoundVariants: [
    ...keysOf(tokens.typography).map((intent) => ({
      variants: { margin: true, intent },
      style: cssForParagraphSpacing(intent),
    })),
  ],
  defaultVariants: {
    intent: "body",
    inline: false,
    margin: false,
    compact: false,
  },
});
