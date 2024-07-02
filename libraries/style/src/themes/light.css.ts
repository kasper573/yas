import { createTheme } from "@vanilla-extract/css";
import * as lightValues from "@yas/design-tokens/themes/light";
import { theme } from "../theme.css";

export const light: string = createTheme(theme, lightValues);
