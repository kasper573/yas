import { style } from "@yas/style";
import { tokens } from "@yas/design-tokens";

export const tabs = style({
  "@media": {
    "screen and (min-width: 1630px)": {
      display: "none",
    },
  },
});

export const row = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  "@media": {
    "screen and (max-width: 1630px)": {
      display: "none",
    },
  },
});

export const col = style({
  selectors: {
    "& + &": {
      marginLeft: tokens.space.xl,
    },
  },
});
