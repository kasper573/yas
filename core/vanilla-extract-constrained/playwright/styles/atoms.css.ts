import { style } from "@vanilla-extract/css";
import { createStyleResolver, all, multi } from "../../src";
import { colors } from "./tokens";

export type ConstrainedStyle = Parameters<typeof resolveStyle>[0];
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
    border: (size: 1 | 2) => `${size}px solid black`,
    multiPropertyAlias: multi({
      "red-color-green-background": {
        color: colors.red,
        background: colors.green,
      },
    }),
  },
  shorthands: {
    bg: ["background"],
    c: ["color"],
  },
});

export const atoms = (constrainedStyle: ConstrainedStyle) =>
  style(resolveStyle(constrainedStyle));
