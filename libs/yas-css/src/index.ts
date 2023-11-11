// This is an encapsulation of vanilla-extract modules.
// You should never use vanilla-extract directly (enforced via linting).

import * as unsafePrimitives from "@vanilla-extract/css";
import { recipe as unsafeRecipe } from "@vanilla-extract/recipes";
import * as tokens from "./tokens";

// Re-export common css utilities
export { destructureVariantProps } from "vanilla-extract-styled";
export { clsx } from "clsx";

// Our own design system specific atomic CSS Framework utilities
export { tokens };
export * from "./constrained";

// But we provide non-atomic escape hatches via a clear naming convention.
export const unsafe = { ...unsafePrimitives, recipe: unsafeRecipe };
