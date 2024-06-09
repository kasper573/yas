import { assignVars } from "./utils/assignVars";

// Custom utilities
export { clsx } from "clsx";
export * from "./utils/gridAreas";
export * from "./utils/breakpointQuery";
export * from "./utils/transformVar";
export * from "./utils/assignVars";
export * from "./utils/animation";
export { cssForBorder } from "./utils/cssForBorder";
export * from "./utils/cssForShadow";
export * from "./utils/cssForTypography";

// Vanilla Extract
export * from "@vanilla-extract/css";
export * from "@vanilla-extract/recipes";
export * from "./theme.css";
export * from "./atoms.css";
export * from "./styled";

// We override vanilla-extracts internal assignVars function because it incorrectly throws errors
// if you pass in a set of values that matches the contract, but has excess values.
// We are okay with having excess values that are being ignored.
export { assignVars };

// Side effects
// TODO this should be moved to a separate file and added to the exports
// property of package.json and then imported explicitly by package consumers
// Then we can enable the sideEffects: false property in package.json
import "./fonts.css";
