import { style } from "@vanilla-extract/css";
import { createStyleResolver, all } from "../../src";
import { colors } from "./tokens";

type ConstrainedStyle = Parameters<typeof resolveStyle>[0];
const resolveStyle = createStyleResolver({
  conditions: {
    default: {},
    condition: { selectors: `&[data-condition]` },
  },
  defaultCondition: "default",
  properties: {
    color: [colors.red, colors.blue],
    background: {
      success: colors.green,
      failure: colors.red,
    },
    fontSize: all(),
  },
  shorthands: {
    bg: ["background"],
    clr: ["color"],
  },
});

export const atoms = (constrainedStyle: ConstrainedStyle) =>
  style(resolveStyle(constrainedStyle));
