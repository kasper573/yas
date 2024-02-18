import type { Property } from "csstype";

export interface FontFamily {
  name: string;
  fonts: Array<{
    src: {
      woff2: string;
      ttf: string;
    };
    fontStyle: Property.FontStyle;
    fontWeight: Property.FontWeight;
  }>;
}
