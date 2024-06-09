import { atoms, style } from "@yas/style";

export const hero = style([
  { paddingTop: "3em", paddingBottom: "3em" },
  atoms({
    px: 0,
    textAlign: "center",
  }),
]);

export const title = atoms({ typography: "h1" });

export const titleWord = style({
  display: "inline-block",
  selectors: {
    "&::first-letter": {
      color: "var(--ifm-color-primary)",
    },
    "& + &": {
      marginLeft: "2rem",
    },
  },
});

export const content = atoms({
  padding: "xl",
  maxWidth: "breakpoint-m",
  margin: "auto",
});

export const container = style({
  "@media": {
    "screen and (max-width: 996px)": {
      [`.${hero}`]: {
        padding: "2rem",
        textAlign: "left",
      },
      [`.${title}`]: {
        marginTop: "-1rem",
      },
      [`.${titleWord}`]: {
        display: "block",
      },
      [`.${titleWord} + .${titleWord}`]: {
        margin: 0,
      },
    },
    "screen and (min-width: 600px) and (max-width: 996px)": {
      [`.${hero}`]: {
        position: "relative",
      },
    },
  },
});
