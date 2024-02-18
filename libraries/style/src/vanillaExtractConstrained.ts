import {
  style as vanillaStyle,
  keyframes as vanillaKeyframes,
  globalStyle as vanillaGlobalStyle,
} from "@vanilla-extract/css";
import { createStyledFactory } from "react-styled-factory";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import type { Style } from "vanilla-extract-constrained";
import type {
  ConstrainedStyle,
  ConstrainedStyleWithoutConditions,
} from "./constraints.css";
import { resolveStyle } from "./constraints.css";

// Constrained vanilla-extract functions
export const style = (constrainedStyle: ConstrainedStyle, debugId?: string) =>
  vanillaStyle(resolveStyle(constrainedStyle), debugId);

export const globalStyle = (
  selector: string,
  constrainedStyle: ConstrainedStyle,
) => vanillaGlobalStyle(selector, resolveStyle(constrainedStyle));

export const keyframes = (
  keyframedConstrainedStyles: Record<string, ConstrainedStyle>,
) =>
  vanillaKeyframes(
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

export type { RecipeVariants } from "vanilla-extract-recipe-factory";
export type { ConstrainedStyle, ConstrainedStyleWithoutConditions };
