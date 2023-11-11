// This is an encapsulation of vanilla-extract modules.
// You should never use vanilla-extract directly (enforced via linting).

import * as unsafePrimitives from "@vanilla-extract/css";
import { recipe as unsafeRecipe } from "@vanilla-extract/recipes";

// Re-export common css utilities
export { clsx } from "clsx";

// Extra typesafe variants of vanilla-extract functions
export * from "./constrained";

// Provide non-constrained escape hatches via a clear naming convention.
export const unsafe = { ...unsafePrimitives, recipe: unsafeRecipe };
