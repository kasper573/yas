import { globalStyle } from "@yas/css";

globalStyle("pre.shiki > .code-title", {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  width: "100%",

  fontFamily: "var(--ifm-font-family-base)",
  fontSize: "var(--ifm-code-font-size)",
  fontWeight: 500,

  color: "var(--ifm-color-emphasis-900)",
  borderBottom: "1px solid var(--ifm-color-emphasis-300)",
  padding: "0 var(--ifm-pre-padding)",

  height: "2.5rem",
  display: "flex",
  alignItems: "center",
});

globalStyle("pre.shiki.with-title", {
  paddingTop: "2.5rem",
});

globalStyle("pre.shiki .copy-button", {
  appearance: "none",
  border: "none",
  cursor: "pointer",
  background: "rgba(0, 0, 0, 0.3)",
  borderRadius: "var(--ifm-global-radius)",
  color: "var(--ifm-color-white)",
  opacity: 0,
  userSelect: "none",
  padding: "0.4rem 0.5rem",
  position: "absolute",
  right: "calc(var(--ifm-pre-padding) / 2)",
  top: "calc(var(--ifm-pre-padding) / 2)",
  transition: "opacity 200ms ease-in-out",
});

globalStyle("pre.shiki.with-title .copy-button", {
  top: "calc(2.5rem + var(--ifm-pre-padding) / 2)",
});

globalStyle("pre.shiki:hover > .copy-button, pre.shiki .copy-button:focus", {
  opacity: 1,
});

globalStyle("pre.shiki", {
  overflow: "visible",
  position: "relative",
  padding: 0,
});

globalStyle("pre.shiki div.line, pre.shiki div.meta-line", {
  paddingLeft: "var(--ifm-pre-padding)",
  paddingRight: "var(--ifm-pre-padding)",
});

globalStyle("pre.shiki > .code-container", {
  padding: "var(--ifm-pre-padding) 0",
});

globalStyle("pre.shiki", {
  border: "1px solid transparent",
});

globalStyle("[data-theme='light'] pre.shiki", {
  borderColor: "var(--ifm-color-emphasis-300)",
});

globalStyle("pre.shiki .language-id", {
  display: "none",
});

globalStyle("pre.shiki:hover .dim", {
  opacity: 1,
  filter: "none",
});

globalStyle("pre.shiki div.dim", {
  opacity: 0.5,
  filter: "grayscale(1)",
  transition: "opacity 200ms ease-in-out",
});

globalStyle("pre.shiki div.dim, pre.shiki div.highlight", {
  margin: 0,
  borderLeft: "2px solid transparent",
});

globalStyle("pre.shiki div.highlight", {
  opacity: 1,
  transition: "background-color 200ms ease-in-out",
});

globalStyle("pre.shiki:hover div.highlight", {
  backgroundColor: "var(--ifm-hover-overlay)",
  borderLeft: "2px solid var(--ifm-color-primary)",
  width: "100%",
});

globalStyle("pre.shiki div.line", {
  minHeight: "1rem",
});

globalStyle("pre.shiki.twoslash:hover data-lsp", {
  borderColor: "var(--ifm-color-emphasis-400)",
});

globalStyle("pre.shiki.twoslash data-lsp:hover::before", {
  content: "attr(lsp)",
  position: "absolute",
  transform: "translate(0, 1.5rem)",
  backgroundColor: "#3f3f3f",
  color: "#fff",
  textAlign: "left",
  padding: "5px 8px",
  borderRadius: "2px",
  fontSize: "85%",
  whiteSpace: "pre-wrap",
  zIndex: 100,
});

globalStyle("pre.shiki .code-container", {
  overflow: "auto",
});

globalStyle("pre.shiki code", {
  whiteSpace: "pre",
  WebkitOverflowScrolling: "touch",
});

globalStyle("pre.shiki code a", {
  textDecoration: "none",
});

globalStyle("pre.shiki data-err", {
  background:
    "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23c94824'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\") repeat-x bottom left",
  paddingBottom: "3px",
});

globalStyle("pre.shiki .query", {
  marginBottom: "10px",
  color: "var(--ifm-color-primary)",
  display: "inline-block",
});

globalStyle("pre.shiki .error, pre.shiki .error-behind", {
  marginTop: "8px",
  padding: "6px",
  paddingLeft: "14px",
  width: "100%",
  whiteSpace: "pre-wrap",
  display: "block",
});

globalStyle("pre.shiki .error", {
  position: "absolute",
  backgroundColor: "#fee",
  borderLeft: "2px solid var(--ifm-color-danger-dark)",
  display: "flex",
  alignItems: "center",
  color: "black",
});

globalStyle("pre.shiki .error .code", {
  display: "none",
});

globalStyle("pre.shiki .error-behind", {
  userSelect: "none",
  color: "#fee",
});

globalStyle("pre.shiki .arrow", {
  backgroundColor: "var(--ifm-color-emphasis-200)",
  position: "relative",
  top: "-7px",
  marginLeft: "0.1rem",
  borderLeft: "1px solid var(--ifm-color-emphasis-200)",
  borderTop: "1px solid var(--ifm-color-emphasis-200)",
  transform: "translateY(25%) rotate(45deg)",
  height: "8px",
  width: "8px",
});

globalStyle("pre.shiki .popover", {
  marginBottom: "10px",
  backgroundColor: "var(--ifm-color-emphasis-200)",
  display: "inline-block",
  padding: "0 0.5rem 0.3rem",
  marginTop: "10px",
  borderRadius: "3px",
});

globalStyle("pre.shiki .inline-completions ul.dropdown", {
  display: "inline-block",
  position: "absolute",
  width: "240px",
  backgroundColor: "var(--ifm-color-emphasis-200)",
  paddingTop: "5px",
  fontFamily: "var(--code-font)",
  margin: "0 0 0 3px",
  padding: "0",
  borderLeft: "2px solid var(--ifm-color-primary)",
});

globalStyle("pre.shiki .inline-completions ul.dropdown::before", {
  backgroundColor: "var(--ifm-color-primary)",
  width: "2px",
  position: "absolute",
  top: "-1.2rem",
  left: "-2px",
  content: " ",
});

globalStyle("pre.shiki .inline-completions ul.dropdown li", {
  overflowX: "hidden",
  paddingLeft: "4px",
  marginBottom: "4px",
});

globalStyle("pre.shiki .inline-completions ul.dropdown li.deprecated", {
  textDecoration: "line-through",
});

globalStyle("pre.shiki .inline-completions ul.dropdown li span.result-found", {
  color: "var(--ifm-color-primary)",
});

globalStyle("pre.shiki .inline-completions ul.dropdown li span.result", {
  width: "100px",
  color: "black",
  display: "inline-block",
});

globalStyle("pre.shiki data-lsp", {
  borderBottom: "1px dotted transparent",
  transitionTimingFunction: "ease",
  transition: "border-color 0.3s",
});

globalStyle(
  `data-lsp, pre .code-container > a, pre.shiki div.dim, pre.shiki div.highlight`,
  {
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
);

globalStyle(`[data-theme="light"] pre.shiki.nord`, {
  display: "none",
});

globalStyle(`[data-theme="dark"] pre.shiki.min-light`, {
  display: "none",
});
