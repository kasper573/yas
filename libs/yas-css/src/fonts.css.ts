import { fontFace } from "@vanilla-extract/css";
import inter400 from "./fonts/inter-latin-400-normal.woff2";
import caveat400 from "./fonts/caveat-latin-400-normal.woff2";

export const inter = fontFace({
  src: [`url(${inter400}) format("woff2")`],
});

export const caveat = fontFace({
  src: [`url(${caveat400}) format("woff2")`],
});
