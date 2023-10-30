import { defineProperties, createConstrained } from "../../../src/index";
import { colors } from "./tokens";

const props = defineProperties({
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
});

export const atoms = createConstrained(props);
