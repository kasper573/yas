import { unsafe } from "@yas/style";

export const container = unsafe.style({
  margin: "auto",
  "@media": {
    "(min-width: 0px)": {
      maxWidth: 0,
    },
    "(min-width: 600px)": {
      maxWidth: 600,
    },
    "(min-width: 960px)": {
      maxWidth: 960,
    },
    "(min-width: 1280px)": {
      maxWidth: 1280,
    },
    "(min-width: 1920px)": {
      maxWidth: 1920,
    },
  },
});
