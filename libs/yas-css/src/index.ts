// This is an encapsulation of vanilla-extract modules.
// You should never use vanilla-extract directly (enforced via linting).

import { style } from "@vanilla-extract/css";
import { recipe as unsafeRecipe } from "@vanilla-extract/recipes";
import { createStyledFactory } from "vanilla-extract-styled";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import * as tokens from "./tokens";
import { atoms } from "./atoms.css";

// Our convention is to prioritize relying on our atomic CSS framework.
const styled = createStyledFactory(atoms);
const recipe = createRecipeFactory(atoms);

// But we provide non-atomic escape hatches via a clear naming convention.
const unsafe = { style, recipe: unsafeRecipe };

export { tokens, styled, atoms, recipe, unsafe };
export { destructureVariantProps, variantProps } from "vanilla-extract-styled";
export * from "./atoms.css";
