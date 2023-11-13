import { fontFace } from "@vanilla-extract/css";

import roboto100italic from "./roboto-latin-100-normal.woff2";
import roboto100normal from "./roboto-latin-100-normal.woff2";
import roboto300italic from "./roboto-latin-300-italic.woff2";
import roboto300normal from "./roboto-latin-300-normal.woff2";
import roboto400italic from "./roboto-latin-400-italic.woff2";
import roboto400normal from "./roboto-latin-400-normal.woff2";
import roboto500italic from "./roboto-latin-500-italic.woff2";
import roboto500normal from "./roboto-latin-500-normal.woff2";
import roboto700italic from "./roboto-latin-700-italic.woff2";
import roboto700normal from "./roboto-latin-700-normal.woff2";
import roboto900italic from "./roboto-latin-900-italic.woff2";
import roboto900normal from "./roboto-latin-900-normal.woff2";

export const roboto = fontFace([
  {
    src: `url(${roboto100italic}) format("woff2")`,
    fontStyle: "italic",
    fontWeight: 100,
  },
  {
    src: `url(${roboto100normal}) format("woff2")`,
    fontStyle: "normal",
    fontWeight: 100,
  },
  {
    src: `url(${roboto300italic}) format("woff2")`,
    fontStyle: "italic",
    fontWeight: 300,
  },
  {
    src: `url(${roboto300normal}) format("woff2")`,
    fontStyle: "normal",
    fontWeight: 300,
  },
  {
    src: `url(${roboto400italic}) format("woff2")`,
    fontStyle: "italic",
    fontWeight: 400,
  },
  {
    src: `url(${roboto400normal}) format("woff2")`,
    fontStyle: "normal",
    fontWeight: 400,
  },
  {
    src: `url(${roboto500italic}) format("woff2")`,
    fontStyle: "italic",
    fontWeight: 500,
  },
  {
    src: `url(${roboto500normal}) format("woff2")`,
    fontStyle: "normal",
    fontWeight: 500,
  },
  {
    src: `url(${roboto700italic}) format("woff2")`,
    fontStyle: "italic",
    fontWeight: 700,
  },
  {
    src: `url(${roboto700normal}) format("woff2")`,
    fontStyle: "normal",
    fontWeight: 700,
  },
  {
    src: `url(${roboto900italic}) format("woff2")`,
    fontStyle: "italic",
    fontWeight: 900,
  },
  {
    src: `url(${roboto900normal}) format("woff2")`,
    fontStyle: "normal",
    fontWeight: 900,
  },
]);
