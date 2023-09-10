import { css } from "@yas/ui";

export const hero = css.style({
  padding: "8rem 0",
  textAlign: "center",
});

export const title = css.style({
  fontSize: "5rem",
});

export const titleWord = css.style({
  display: "inline-block",
  selectors: {
    "&::first-letter": {
      color: "var(--ifm-color-primary)",
    },
    "& + &": {
      marginLeft: "0.25em",
    },
  },
});

export const tagline = css.style({
  fontSize: "2rem",
  margin: 0,
});

export const features = css.style({});

export const feature = css.style({
  padding: "2rem 2rem",
});

export const featureImage = css.style({
  objectFit: "contain",
  marginBottom: "1em",
});

export const container = css.style({
  "@media": {
    "screen and (max-width: 996px)": {
      [`.${hero}`]: {
        padding: "2rem",
        textAlign: "left",
      },
      [`.${title}`]: {
        marginTop: "-1rem",
      },
      [`.${tagline}`]: {
        textAlign: "center",
      },
      [`.${titleWord}`]: {
        display: "block",
      },
      [`.${titleWord} + .${titleWord}`]: {
        margin: 0,
      },
      [`.${feature} + .${feature}`]: {
        marginTop: "24px",
      },
    },
    "screen and (min-width: 600px) and (max-width: 996px)": {
      [`.${hero}`]: {
        position: "relative",
      },
      [`.${tagline}`]: {
        position: "absolute",
        top: "2rem",
        right: "2rem",
        textAlign: "right",
        left: "300px",
      },
      [`.${features}`]: {
        marginTop: "-6rem",
      },
    },
  },
});
