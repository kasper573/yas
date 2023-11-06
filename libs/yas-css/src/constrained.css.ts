import { defineProperties as defineConstrainedProperties } from "vanilla-extract-constrained";
import { createConstrained } from "vanilla-extract-constrained";
import { themeVars } from "./themeVars.css";

const colors = {
  transparent: "transparent",
  ...themeVars.color,
};

const props = defineConstrainedProperties({
  conditions: {
    default: {},
    condition: { selector: `&[data-condition]` },
  },
  defaultCondition: "default",
  properties: {
    color: colors,
    background: colors,
  },
});

export const constrainedStyle = createConstrained(props);
