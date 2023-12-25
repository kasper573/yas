import * as vanilla from "@vanilla-extract/css";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import { createStyledFactory } from "react-styled-factory";
import type { Style } from "vanilla-extract-constrained";
import type {
  ConstrainedStyle,
  ConstrainedStyleWithoutConditions,
} from "./constraints.css";

import { resolveStyle } from "./constraints.css";

// Utilities
export { clsx } from "clsx";
export { palette } from "./tokens";
export {
  createVar,
  layer,
  globalLayer,
  createContainer,
} from "@vanilla-extract/css";
export * from "@vanilla-extract/dynamic";

// Constrained vanilla-extract functions
export const style = (constrainedStyle: ConstrainedStyle, debugId?: string) =>
  vanilla.style(resolveStyle(constrainedStyle), debugId);

export const globalStyle = (
  selector: string,
  constrainedStyle: ConstrainedStyle,
) => vanilla.globalStyle(selector, resolveStyle(constrainedStyle));

export const keyframes = (
  keyframedConstrainedStyles: Record<string, ConstrainedStyle>,
) =>
  vanilla.keyframes(
    Object.fromEntries(
      Object.entries(keyframedConstrainedStyles).map(
        ([key, constrainedStyle]) => [key, resolveStyle(constrainedStyle)],
      ),
    ),
  );

export const styled = createStyledFactory({
  compile: resolveStyle as (
    constrainedStyle: ConstrainedStyleWithoutConditions,
  ) => Style,
});

export const recipe = createRecipeFactory(resolveStyle);

export * from "./gridAreas";

export type { RecipeVariants } from "vanilla-extract-recipe-factory";
export type { ConstrainedStyle, ConstrainedStyleWithoutConditions };

// Non-constrained escape hatches
export * as unsafe from "./unsafe";
