import type { FontFamily } from "../convention";
import inter100ttf from "./ttf/inter-latin-100-normal.ttf";
import inter100woff2 from "./webfonts/inter-latin-100-normal.woff2";
import inter200ttf from "./ttf/inter-latin-200-normal.ttf";
import inter200woff2 from "./webfonts/inter-latin-200-normal.woff2";
import inter300ttf from "./ttf/inter-latin-300-normal.ttf";
import inter300woff2 from "./webfonts/inter-latin-300-normal.woff2";
import inter400ttf from "./ttf/inter-latin-400-normal.ttf";
import inter400woff2 from "./webfonts/inter-latin-400-normal.woff2";
import inter500ttf from "./ttf/inter-latin-500-normal.ttf";
import inter500woff2 from "./webfonts/inter-latin-500-normal.woff2";
import inter600ttf from "./ttf/inter-latin-600-normal.ttf";
import inter600woff from "./webfonts/inter-latin-600-normal.woff";
import inter700ttf from "./ttf/inter-latin-700-normal.ttf";
import inter700woff2 from "./webfonts/inter-latin-700-normal.woff2";
import inter800ttf from "./ttf/inter-latin-800-normal.ttf";
import inter800woff2 from "./webfonts/inter-latin-800-normal.woff2";
import inter900ttf from "./ttf/inter-latin-900-normal.ttf";
import inter900woff2 from "./webfonts/inter-latin-900-normal.woff2";

export const inter: FontFamily = {
  name: "Inter",
  fonts: [
    {
      src: {
        woff2: inter100woff2,
        ttf: inter100ttf,
      },
      fontStyle: "normal",
      fontWeight: 100,
    },
    {
      src: {
        woff2: inter200woff2,
        ttf: inter200ttf,
      },
      fontStyle: "normal",
      fontWeight: 200,
    },
    {
      src: {
        woff2: inter300woff2,
        ttf: inter300ttf,
      },
      fontStyle: "normal",
      fontWeight: 300,
    },
    {
      src: {
        woff2: inter400woff2,
        ttf: inter400ttf,
      },
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: {
        woff2: inter500woff2,
        ttf: inter500ttf,
      },
      fontStyle: "normal",
      fontWeight: 500,
    },
    {
      src: {
        woff2: inter600woff,
        ttf: inter600ttf,
      },
      fontStyle: "normal",
      fontWeight: 600,
    },
    {
      src: {
        woff2: inter700woff2,
        ttf: inter700ttf,
      },
      fontStyle: "normal",
      fontWeight: 700,
    },
    {
      src: {
        woff2: inter800woff2,
        ttf: inter800ttf,
      },
      fontStyle: "normal",
      fontWeight: 800,
    },
    {
      src: {
        woff2: inter900woff2,
        ttf: inter900ttf,
      },
      fontStyle: "normal",
      fontWeight: 900,
    },
  ],
};
