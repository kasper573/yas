# vanilla-extract-constrained

A utility to enable enhancing the vanilla extract primitives with a constrained API

```typescript
import * as vanilla from "@vanilla-extract/css";
import { createStyleResolver, all } from "vanilla-extract-constrained";

export type ConstrainedStyle = Parameters<typeof resolveStyle>[0];

// Define your properties (inspired by sprinkles)
const resolveStyle = createStyleResolver({
  conditions: {
    default: {},
    hover: { selectors: `&:hover` },
  },
  defaultCondition: "default",
  properties: {
    color: ["red", "blue"],
    background: {
      success: "green",
      failure: "red",
    },
    fontSize: all(),
  },
  shorthands: {
    bg: ["background"],
    clr: ["color"],
  },
});

// The following functions behave like their vanilla extract counterparts,
// but ensures only your constrained property values are used

export const style = (cStyle: ConstrainedStyle) =>
  vanilla.style(resolveStyle(cStyle));

export const globalStyle = (selector: string, cStyle: ConstrainedStyle) =>
  vanilla.globalStyle(selector, resolveStyle(cStyle));

export const keyframes = (keyframedStyles: Record<string, ConstrainedStyle>) =>
  vanilla.keyframes(
    Object.fromEntries(
      Object.entries(keyframedStyles).map(([key, cStyle]) => [
        key,
        resolveAtoms(cStyle),
      ]),
    ),
  );
```
