import { atoms } from "./atoms.css";
import { colors } from "./tokens";

export const conditionalRedColor = atoms({
  color: {
    default: colors.blue,
    condition: colors.red,
  },
});

export const validAliasedRedBackground = atoms({
  background: "failure",
});

export const validRedColor = atoms({
  color: colors.red,
});

export const validRedColorAndGreenBackground = atoms({
  color: colors.red,
  background: "success",
});
