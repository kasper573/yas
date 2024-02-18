import { createTheme } from "@vanilla-extract/css";
import { values } from "@yas/design-system/themes/dark";
import { variables } from "../src";

export const dark: string = createTheme(variables, values);
