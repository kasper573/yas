import { defineProperties, createConstrained } from "../../index";
import { colors } from "./tokens";

const props = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
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
