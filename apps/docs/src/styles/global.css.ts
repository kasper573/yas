import { unsafe } from "@yas/style";

unsafe.globalStyle(":root", {
  vars: {
    "--ifm-color-primary": "#296aa3",
    "--ifm-color-primary-dark": "#255f93",
    "--ifm-color-primary-darker": "#235a8b",
    "--ifm-color-primary-darkest": "#1d4a72",
    "--ifm-color-primary-light": "#2d75b3",
    "--ifm-color-primary-lighter": "#2f7abb",
    "--ifm-color-primary-lightest": "#3b89ce",
    "--ifm-background-color": "#fafcff",
    "--ifm-background-gradient":
      "linear-gradient(rgb(237, 245, 255), rgb(250, 252, 255))",
    "--docusaurus-highlighted-code-line-bg": "rgba(0, 0, 0, 0.1)",
  },
});

unsafe.globalStyle(":root[data-theme='dark']", {
  vars: {
    "--ifm-color-primary": "#9aabfe",
    "--ifm-color-primary-dark": "#7289fe",
    "--ifm-color-primary-darker": "#5d79fd",
    "--ifm-color-primary-darkest": "#2146fd",
    "--ifm-color-primary-light": "#c2cdfe",
    "--ifm-color-primary-lighter": "#d7ddff",
    "--ifm-color-primary-lightest": "#ffffff",
    "--ifm-background-color": "#0c112c",
    "--ifm-background-gradient":
      "linear-gradient(rgb(45, 20, 80), rgb(31, 32, 43))",
    "--ifm-navbar-background-color": "#160825",
    "--docusaurus-highlighted-code-line-bg": "rgba(255, 255, 255, 0.1)",
  },
});

unsafe.globalStyle("html", {
  background: "var(--ifm-background-gradient)",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
});

unsafe.globalStyle(".footer", {
  background: "transparent",
});

unsafe.globalStyle(`[data-theme="light"] pre.shiki.nord`, {
  display: "none",
});

unsafe.globalStyle(`[data-theme="dark"] pre.shiki.min-light`, {
  display: "none",
});
