import { style, unsafe } from "@yas/style";

export const hero = style({
  px: 0,
  py: "#10",
  textAlign: "center",
});

export const title = style({
  fontSize: "#9",
});

export const titleWord = unsafe.style({
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

export const tagline = style({
  fontSize: "#5",
  margin: 0,
});

export const features = style({});

const featureBase = style({
  p: "#5",
});

export const feature = unsafe.recipe({
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

export const featureImage = style({
  objectFit: "contain",
  mb: "#2",
});

export const container = unsafe.style({
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
