import { style } from "@vanilla-extract/css";
import { createStyleResolver } from "../../src";
import { colors } from "./tokens";

type ConstrainedStyle = Parameters<typeof resolveStyle>[0];
const resolveStyle = createStyleResolver({
  conditions: {
    default: {},
    condition: { selector: `&[data-condition]` },
  },
  defaultCondition: "default",
  properties: {
    color: [colors.red, colors.blue],
    background: {
      success: colors.green,
      failure: colors.red,
    },
  },
  shorthands: {
    bg: ["background"],
    clr: ["color"],
  },
} as const);

export const atoms = (constrainedStyle: ConstrainedStyle) =>
  style(resolveStyle(constrainedStyle));
