import { inter } from "../fonts/inter";
import type * as shared from "../shared";
import type { FontFaceDefinition } from "../internal";

// This is a separate file and package export to allow apps and frameworks to
// opt in to using the embedded assets of the design tokens package.
// Some frameworks have opinionated ways of loading assets and may be unable to use these.

export const fontFaces = {
  Inter: inter,
} satisfies Record<ValuesOf<typeof shared.text.family>, FontFaceDefinition[]>;

type ValuesOf<T> = T[keyof T];
