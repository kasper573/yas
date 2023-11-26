import * as vanilla from "@vanilla-extract/css";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import { createStyledFactory } from "vanilla-extract-styled";
import { shallowEqual } from "shallow-equal";
import type { ConstrainedStyle } from "./constraints.css";
import { resolveStyle } from "./constraints.css";

// Utilities
export { clsx } from "clsx";
export { palette } from "./tokens";

// Constrained vanilla-extract functions
export const style = (constrainedStyle: ConstrainedStyle) =>
  vanilla.style(resolveStyle(constrainedStyle));

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

export const styled = createStyledFactory(resolveStyle, shallowEqual);

export const recipe = createRecipeFactory(style);

export { destructureVariantProps } from "vanilla-extract-styled";

export type { ConstrainedStyle };

// Non-constrained escape hatches
export * as unsafe from "./unsafe";
