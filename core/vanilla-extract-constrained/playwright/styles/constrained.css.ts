import { layer } from "@vanilla-extract/css";
import { atoms } from "./atoms.css";
import { colors } from "./tokens";

export const unconstrainedFontSize42px = atoms({
  fontSize: "42px",
});

export const conditionalRedColor = atoms({
  color: {
    default: colors.blue,
    condition: colors.red,
  },
});

export const functional2pxBorderAsValueInput = atoms({
  border: 2,
});

export const functional2pxBorderAsArrayInput = atoms({
  border: [2],
});

export const validAliasedRedBackground = atoms({
  background: "failure",
});

export const validShorthandRedColor = atoms({
  c: colors.red,
});

export const validAliasedShorthandRedBackground = atoms({
  bg: "failure",
});

export const validRedColor = atoms({
  color: colors.red,
});

export const validRedColorAndGreenBackground = atoms({
  color: colors.red,
  background: "success",
});

const layerName = layer();
export const layerRedColor = atoms({
  "@layer": {
    [layerName]: {
      color: colors.red,
    },
  },
});

export const fooSelectorRedColor = atoms({
  selectors: {
    "&.foo": {
      color: colors.red,
    },
  },
});
