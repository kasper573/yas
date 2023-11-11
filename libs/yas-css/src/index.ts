// This is an encapsulation of vanilla-extract modules.
// You should never use vanilla-extract directly (enforced via linting).

import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { recipe as unsafeRecipe } from "@vanilla-extract/recipes";
import { createStyledFactory } from "vanilla-extract-styled";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import * as tokens from "./tokens";
import { style as atoms, inlineStyle as inlineAtoms } from "./constrained.css";

// Re-export common css utilities
export { destructureVariantProps } from "vanilla-extract-styled";
export { clsx } from "clsx";

// Our own design system specific atomic CSS Framework utilities
export const styled = createStyledFactory(inlineAtoms);
export const recipe = createRecipeFactory(atoms);
export { tokens, atoms, inlineAtoms };
export * from "./themeVars.css";
export type { ConstrainedStyle } from "./constrained.css";

// But we provide non-atomic escape hatches via a clear naming convention.
export const unsafe = { style, keyframes, globalStyle, recipe: unsafeRecipe };
