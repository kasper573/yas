import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "@yas/design-system";
import { values } from "@yas/design-system/themes/dark";

export const dark: string = createTheme(themeContract, values);
