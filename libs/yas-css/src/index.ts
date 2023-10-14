// This is an encapsulation of vanilla-extract modules.
// You should never use vanilla-extract directly (enforced via linting).

import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { recipe as unsafeRecipe } from "@vanilla-extract/recipes";
import { createStyledFactory } from "vanilla-extract-styled";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import * as tokens from "./tokens";
import { atoms } from "./atoms.css";

// Re-export common css utilities
export { clsx } from "clsx";

// Our own design system specific atomic CSS Framework utilities
export const styled = createStyledFactory(atoms);
export const recipe = createRecipeFactory(atoms);
export { tokens, atoms };
export * from "./themeVars.css";
export type { Atoms } from "./atoms.css";

// But we provide non-atomic escape hatches via a clear naming convention.
export const unsafe = { style, keyframes, globalStyle, recipe: unsafeRecipe };
