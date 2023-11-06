import { atoms } from "./atoms.css";
import { colors } from "./tokens";

export const conditionalRedColor = atoms({
  // @ts-expect-error
  color: {
    default: colors.blue,
    condition: colors.red,
  },
});

export const validAliasedRedBackground = atoms({
  background: "failure",
});

export const validShorthandRedColor = atoms({
  // @ts-expect-error
  clr: colors.red,
});

export const validAliasedShorthandRedBackground = atoms({
  // @ts-expect-error
  bg: "failure",
});

export const validRedColor = atoms({
  color: colors.red,
});

export const validRedColorAndGreenBackground = atoms({
  color: colors.red,
  background: "success",
});
