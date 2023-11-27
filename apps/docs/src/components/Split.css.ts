import { style, unsafe } from "@yas/style";

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

export const col = style({
  selectors: {
    "& + &": {
      marginLeft: "#6",
    },
  },
});
