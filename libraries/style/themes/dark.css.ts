import { createTheme } from "@vanilla-extract/css";
import * as darkValues from "@yas/design-tokens/themes/dark";
import { theme } from "../src/theme.css";

export const dark: string = createTheme(theme, darkValues);
