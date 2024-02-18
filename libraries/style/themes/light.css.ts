import { createTheme } from "@vanilla-extract/css";
import { values } from "@yas/design-system/themes/light";
import { variables } from "../src";

export const light: string = createTheme(variables, values);
