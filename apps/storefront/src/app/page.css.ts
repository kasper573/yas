import { globalStyle, style } from "@yas/style";

export const main = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6rem",
  minHeight: "100vh",
});

export const description = style({
  display: "inherit",
  justifyContent: "inherit",
  alignItems: "inherit",
  fontSize: "0.85rem",
  maxWidth: "var(--max-width)",
  width: "100%",
  zIndex: 2,
  fontFamily: "var(--font-mono)",
});

globalStyle(`${description} a`, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

globalStyle(`${description} p`, {
  position: "relative",
  margin: "0",
  padding: "1rem",
  backgroundColor: "rgba(var(--callout-rgb), 0.5)",
  border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
  borderRadius: "var(--border-radius)",
});

export const code = style({
  fontWeight: 700,
  fontFamily: "var(--font-mono)",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(25%, auto))",
  maxWidth: "100%",
  width: "var(--max-width)",
});

export const card = style({
  padding: "1rem 1.2rem",
  borderRadius: "var(--border-radius)",
  background: "rgba(var(--card-rgb), 0)",
  border: "1px solid rgba(var(--card-border-rgb), 0)",
  transition: "background 200ms, border 200ms",
});

globalStyle(`${card} span`, {
  display: "inline-block",
  transition: "transform 200ms",
});

globalStyle(`${card} h2`, {
  fontWeight: 600,
  marginBottom: "0.7rem",
});

globalStyle(`${card} p`, {
  margin: "0",
  opacity: "0.6",
  fontSize: "0.9rem",
  lineHeight: "1.5",
  maxWidth: "30ch",
});

const shared = {
  content: "",
  left: "50%",
  position: "absolute",
  filter: "blur(45px)",
  transform: "translateZ(0)",
} as const;

export const center = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "4rem 0",
  selectors: {
    "&:before": {
      ...shared,
      background: "var(--secondary-glow)",
      borderRadius: "50%",
      width: "480px",
      height: "360px",
      marginLeft: "-400px",
    },
    "&:after": {
      ...shared,
      background: "var(--primary-glow)",
      width: "240px",
      height: "180px",
      zIndex: -1,
    },
  },
});

export const logo = style({
  position: "relative",
  "@media": {
    "(prefers-color-scheme: dark)": {
      filter: "invert(1) drop-shadow(0 0 0.3rem #ffffff70)",
    },
  },
});

export const vercelLogo = style({
  "@media": {
    "(prefers-color-scheme: dark)": {
      filter: "invert(1)",
    },
  },
});
