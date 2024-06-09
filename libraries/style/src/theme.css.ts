import { createThemeContract } from "@vanilla-extract/css";
import { themeContract } from "@yas/design-tokens";

export const theme = createThemeContract(themeContract);
