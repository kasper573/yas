import { fontFace } from "@vanilla-extract/css";
import inter900NormalWoff2 from "./fonts/inter-latin-ext-900-normal.woff2";
import caveat700NormalWoff2 from "./fonts/caveat-latin-700-normal.woff2";

export const inter = fontFace({
  src: [`url(${inter900NormalWoff2}) format("woff2")`],
});

export const caveat = fontFace({
  src: [`url(${caveat700NormalWoff2}) format("woff2")`],
});
