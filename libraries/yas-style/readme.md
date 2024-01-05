# @yas/style

Design system based on, and extra typesafe encapsulation of [Vanilla Extract](https://vanilla-extract.style).

All styling must be done using typesafe `.css.ts` files.

A React component factory is available as `styled`:

```tsx
import { styled } from "@yas/style";
import { myRecipe } from "./myStyles.css";

const MyComponent = styled("div", myRecipe);
```

Also provides additional style related utilities, such as [breakpointQuery](./src/utils/breakpointQuery.ts) and [gridAreas](./src/utils/gridAreas.ts).
