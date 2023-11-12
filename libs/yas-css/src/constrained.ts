import * as unsafe from "@vanilla-extract/css";
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import { createStyledFactory } from "vanilla-extract-styled";
import type { Atoms } from "./atoms.css";
import { resolveAtoms } from "./atoms.css";

export const style = (constrainedStyle: Atoms) =>
  unsafe.style(resolveAtoms(constrainedStyle));

export const globalStyle = (selector: string, constrainedStyle: Atoms) =>
  unsafe.globalStyle(selector, resolveAtoms(constrainedStyle));

export const keyframes = (keyframedConstrainedStyles: Record<string, Atoms>) =>
  unsafe.keyframes(
    Object.fromEntries(
      Object.entries(keyframedConstrainedStyles).map(
        ([key, constrainedStyle]) => [key, resolveAtoms(constrainedStyle)],
      ),
    ),
  );

export const styled = createStyledFactory(resolveAtoms);
export { destructureVariantProps } from "vanilla-extract-styled";

export const recipe = createRecipeFactory(style);

export type { Atoms };
