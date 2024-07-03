import * as lightTheme from "./themes/light";

export * as tokens from "./tokens";

export * from "./utils";

// It's fine to use any theme here as the contract, since all themes have the same data structure
export const themeContract = lightTheme;
