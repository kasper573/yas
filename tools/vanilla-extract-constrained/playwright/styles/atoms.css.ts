import { createConstrained } from "../../src";
import { colors } from "./tokens";

export const [atoms] = createConstrained({
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
