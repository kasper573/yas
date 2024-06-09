export interface FontFaceDefinition {
  src: {
    woff2: string;
    truetype: string;
  };
  fontStyle?: "normal" | "italic" | "oblique";
  fontWeight?: number;
}
