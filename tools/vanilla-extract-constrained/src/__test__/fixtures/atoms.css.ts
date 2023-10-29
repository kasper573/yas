import { defineProperties, createConstrained } from "../../index";

const props = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "default",
  properties: {
    color: ["red", "blue"],
    background: {
      success: "green",
      failure: "red",
    },
  },
});

export const atoms = createConstrained(props);
