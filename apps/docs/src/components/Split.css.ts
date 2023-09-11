import { css } from "@yas/ui";

export const tabs = css.style({
  "@media": {
    "screen and (min-width: 1630px)": {
      display: "none",
    },
  },
});

export const row = css.style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  "@media": {
    "screen and (max-width: 1630px)": {
      display: "none",
    },
  },
});

export const col = css.style({
  selectors: {
    "& + &": {
      marginLeft: 24,
    },
  },
});
