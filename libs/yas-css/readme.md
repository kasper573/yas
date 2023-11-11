# @yas/css

An extra typesafe and react specific encapsulation of [Vanilla Extract](https://vanilla-extract.style).

All styling must be done using typesafe `.css.ts` files.

Additionally, a React component factory is available as `styled`:

```tsx
import { styled } from "@yas/css";
import { myRecipe } from "./myStyles.css";

const MyComponent = styled("div", myRecipe);
```
