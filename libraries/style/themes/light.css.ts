import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "@yas/design-system";
import { values } from "@yas/design-system/themes/light";

export const light: string = createTheme(themeContract, values);
