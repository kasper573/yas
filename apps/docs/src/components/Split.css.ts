import { unsafe } from "@yas/css";

export const tabs = unsafe.style({
  "@media": {
    "screen and (min-width: 1630px)": {
      display: "none",
    },
  },
});

export const row = unsafe.style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  "@media": {
    "screen and (max-width: 1630px)": {
      display: "none",
    },
  },
});

export const col = unsafe.style({
  selectors: {
    "& + &": {
      marginLeft: 24,
    },
  },
});
