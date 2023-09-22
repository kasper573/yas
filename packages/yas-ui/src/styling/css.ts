// This is an encapsulation of vanilla-extract modules.
// You should never use vanilla-extract directly (enforced via linting).

// Re-export our chosen styling libraries as-is
export * from "@vanilla-extract/css";
export * from "@vanilla-extract/recipes";
export * from "clsx";

// Export our custom utilities
export * from "./atoms.css";
import { createStyledFactory } from "vanilla-extract-styled";
import { atoms } from "./atoms.css";
export const styled = createStyledFactory(atoms);
export { destructureVariantProps, variantProps } from "vanilla-extract-styled";
