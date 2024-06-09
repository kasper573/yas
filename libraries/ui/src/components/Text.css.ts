import { recipe, atoms, cssForParagraphSpacing } from "@yas/style";
import { keysOf, mapValues, tokens } from "@yas/design-tokens";

export const textRecipe = recipe({
  variants: {
    intent: mapValues(tokens.typography, (_, typography) =>
      atoms({ typography }),
    ),
    /**
     * Enables the intent specific margin. Commonly used for paragraph spacing.
     */
    margin: {
      false: { margin: 0 },
    },
    /**
     * Disables the intent specific line height. Commonly used for single line text.
     */
    inline: {
      true: [atoms({ whiteSpace: "nowrap" }), { lineHeight: "1em" }],
    },
    /**
     * Render the text with white space preserved. Commonly used to display simple pre-formatted text.
     */
    preWrap: {
      true: atoms({ whiteSpace: "pre-wrap" }),
    },
    overflow: {
      visible: {},
      clip: atoms({ textOverflow: "clip", overflow: "hidden" }),
      ellipsis: atoms({ textOverflow: "ellipsis", overflow: "hidden" }),
    },
  },
  compoundVariants: [
    ...keysOf(tokens.typography).map((intent) => ({
      variants: { paragraph: true, intent },
      style: cssForParagraphSpacing(intent),
    })),
  ],
  defaultVariants: {
    intent: "body",
    margin: false,
  },
});
