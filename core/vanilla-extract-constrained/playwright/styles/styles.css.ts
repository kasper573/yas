import { layer } from "@vanilla-extract/css";
import { constrained } from "./constraints.css";
import { colors } from "./tokens";

export const unconstrainedFontSize42px = constrained({
  fontSize: "42px",
});

export const conditionalRedColor = constrained({
  color: {
    default: colors.blue,
    condition: colors.red,
  },
});

export const functional2pxBorderAsValueInput = constrained({
  border: 2,
});

export const functional2pxBorderAsArrayInput = constrained({
  border: [2],
});

export const validAliasedRedBackground = constrained({
  background: "failure",
});

export const validShorthandRedColor = constrained({
  c: colors.red,
});

export const validAliasedShorthandRedBackground = constrained({
  bg: "failure",
});

export const validRedColor = constrained({
  color: colors.red,
});

export const validRedColorAndGreenBackground = constrained({
  color: colors.red,
  background: "success",
});

export const redColorAndGreenBackgroundViaSingleAlias = constrained({
  multiPropertyAlias: "red-color-green-background",
});

const layerName = layer();
export const layerRedColor = constrained({
  "@layer": {
    [layerName]: {
      color: colors.red,
    },
  },
});

export const fooSelectorRedColor = constrained({
  selectors: {
    "&.foo": {
      color: colors.red,
    },
  },
});
