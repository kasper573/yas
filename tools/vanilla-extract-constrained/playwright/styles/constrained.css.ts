import type { ConditionKey } from "../../src/types";
import type { ConstrainedStyle } from "./atoms.css";
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

export const validAliasedRedBackground = atoms({
  background: "failure",
});

export const validShorthandRedColor = atoms({
  clr: colors.red,
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

export const layerRedColor = cond("@layer", "layer-name", {
  color: colors.red,
});

export const containerRedColor = cond("@container", "container-name", {
  color: colors.red,
});

export const mediaRedColor = cond("@media", "(max-width: 9999px)", {
  color: colors.red,
});

export const supportsRedColor = cond("@supports", "(display: grid)", {
  color: colors.red,
});

export const fooSelectorRedColor = cond("selectors", "&.foo", {
  color: colors.red,
});

function cond<
  Key extends ConditionKey,
  Name extends string,
  Style extends ConstrainedStyle,
>(key: Key, name: Name, style: Style) {
  return atoms({
    [key]: {
      [name]: style,
    },
  });
}
