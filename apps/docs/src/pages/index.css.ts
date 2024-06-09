import { atoms, recipe, style } from "@yas/style";

export const hero = atoms({
  px: 0,
  py: "xl",
  textAlign: "center",
});

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

export const tagline = atoms({
  typography: "h2",
  margin: 0,
});

export const features = style({});

const featureBase = atoms({ p: "xl" });

export const feature = recipe({
  base: ["col", "text--center", featureBase],
  variants: {
    columns: {
      1: "col--12",
      2: "col--6",
      3: "col--4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export const featureImage = atoms({
  objectFit: "contain",
  mb: "m",
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
      [`.${tagline}`]: {
        textAlign: "center",
      },
      [`.${titleWord}`]: {
        display: "block",
      },
      [`.${titleWord} + .${titleWord}`]: {
        margin: 0,
      },
      [`.${feature.classNames.base} + .${feature.classNames.base}`]: {
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
