import * as vanilla from "@vanilla-extract/css";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import { createStyledFactory } from "vanilla-extract-styled";
import { shallowEqual } from "shallow-equal";
import { themeVars } from "./themeVars.css";
import type { Atoms } from "./atoms.css";
import { resolveAtoms } from "./atoms.css";
import { createTransitionFactory } from "./createTransitionFactory";

export const style = (constrainedStyle: Atoms) =>
  vanilla.style(resolveAtoms(constrainedStyle));

export const globalStyle = (selector: string, constrainedStyle: Atoms) =>
  vanilla.globalStyle(selector, resolveAtoms(constrainedStyle));

export const keyframes = (keyframedConstrainedStyles: Record<string, Atoms>) =>
  vanilla.keyframes(
    Object.fromEntries(
      Object.entries(keyframedConstrainedStyles).map(
        ([key, constrainedStyle]) => [key, resolveAtoms(constrainedStyle)],
      ),
    ),
  );

export const styled = createStyledFactory(resolveAtoms, shallowEqual);

export const recipe = createRecipeFactory(style);

export const createTransition = createTransitionFactory(themeVars.transitions);

export { destructureVariantProps } from "vanilla-extract-styled";

export type { Atoms };
