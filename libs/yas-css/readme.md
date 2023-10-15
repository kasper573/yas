# @yas/css

An extra typesafe and react specific encapsulation of [Vanilla Extract](https://vanilla-extract.style).

All styling must be done using typesafe `.css.ts` files.

## Usage

You have access to these Vanilla Extract APIs:

```tsx
import { style, recipe, atoms } from "@yas/css";

const myStyle = style(...); // Equivalent of using {style} from vanilla-extract/css
const myRecipe = recipe(...); // Equivalent of using {recipe} from vanilla-extract/recipes, but with a more typesafe API.
const myAtom = atoms(...); // Equivalent of using vanilla-extract/sprinkles
```

Additionally, a React component factory is available as `styled`:

```tsx
import { styled } from "@yas/css";
import { myRecipe } from "./myStyles.css";

const MyComponent = styled("div", myRecipe);
```
