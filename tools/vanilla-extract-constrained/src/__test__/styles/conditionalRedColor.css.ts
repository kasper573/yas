import { atoms } from "./atoms.css";
import { colors } from "./tokens";

export const conditionalRedColor = atoms({
  color: {
    default: colors.blue,
    condition: colors.red,
  },
});
