# vanilla-extract-constrained

A utility to enable enhancing the vanilla extract primitives with a constrained API.

Provides the same type safety and strictness of sprinkles (and with a similar API), but with the flexibility to apply it to all compatible vanilla extract primitives, and even outside of vanilla extract.

> Heads-up: vanilla-extract-constrained does not generate atomic CSS like sprinkles does, and instead generates potentially duplicated css across the css classes that gets generated. However, a lot of apps should be okay with this performance trade-off, and some likely even benefit from it, since this approach means you generate less verbose HTML due to the large amount of css class names that atomic css yields.

> Heads up 2: This package does not follow semantic versioning. Changes of all types are released to the patch portion of the version string.

Here's how you define your constraints, very much like sprinkles:

```typescript
// constrained.css.ts
import { createStyleResolver, all, multi } from "vanilla-extract-constrained";

export type ConstrainedStyle = Parameters<typeof resolveStyle>[0];

export const resolveStyle = createStyleResolver({
  conditions: {
    default: {},
    hover: { selectors: `&:hover` },
  },
  defaultCondition: "default",
  properties: {
    color: {
      success: "green",
      failure: "red",
    },
    background: ["yellow", "blue"]
    fontSize: all(), // Infers and accepts all default CSS values for this property
    border: multi({ // Allows specifying aliases that will define multiple properties at once
      standard: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
      },
      thick: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
      },
    }),
    transition  (...list: Transition[]) {
      // Function properties allow you to safely deal with composite and dynamic values
      // The function should return a valid css value, but may accept ANY argument types.
      return list.map((parts) => parts.join(" ")).join(", ")
    }
  },
  shorthands: {
    bg: ["background"],
  },
});

type Transition = [
  prop: string,
  time: "1s" | "2s",
  easing: "ease-out" | "ease-in"
]
```

Using this `resolveStyle` function you can now define new stricter versions of the vanilla extract primitives:

```typescript
import * as vanilla from "@vanilla-extract/css";

// The following functions behave like their vanilla extract counterparts,
// but ensures only your constrained property values are accepted as input.

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

Use your new vanilla extract functions as usual, _but now constrained_:

```typescript
// my-styles.css.ts
import {style, globalStyle, keyframes} from "./constrained.css.ts"

export foo = style({
  background: "invalid", // Errors, must be yellow or blue
  color: "success", // Aliases work just like in sprinkles
  bg: "yellow", // As does shorthands
  fontSize: { // As does conditions
    default: 14,
    hover: 18
  }
  // This is new and unique to vanilla-extract-constrained
  // Your own custom functions parameters type is what decides goes here
  transition: [
    ["font-size", "1s", "ease-out"] // This must match the Transition type (see above)
  ]
});


// The same constraints apply everywhere you used your style resolver!
// (props omitted for brevity)
const bar = globalStyle(...);

const baz = keyframes(...);
```

You can even use it to create constrained and enhanced inline styles:

```tsx
import { resolveStyle } from "./constrained.css.ts";

// This is a React example, but you could use any framework.
<div
  style={resolveStyle({
    color: "success",
  })}
>
  I am green!
</div>;
```

> Using vanilla-extract-constrained at runtime is opt-in. If you do, it will embed minimal javascript to your bundle to allow inline resolution of your constraints. However if you only use resolveStyle inside .css.ts files, no extra javascript gets bundled.
