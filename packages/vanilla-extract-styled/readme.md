# vanilla-extract-styled

Tiny utility for creating typesafe [Recipes](https://vanilla-extract.style/documentation/packages/recipes/)
and [Sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) based [React](https://reactjs.org/)
components without having to do the type and props wiring.

## Usage

Use the provided factory to create a styled function specific to your atoms.
You may omit the atoms argument if you are not using sprinkles.

```tsx
import { createStyledFactory } from "vanilla-extract-styled";
import { atoms } from "./sprinkles.css.ts";

export const styled = createStyledFactory(atoms);
```

Then use the styled function with a recipe to create a component based on that recipe.

```tsx
import { myRecipe } from "./styles.css.ts";
import { styled } from "./styled";

const Component = styled("div", myRecipe);
```

The recipe variants will be available as props

```tsx
<Component variant1="foo" variant2="bar" />
```

The atoms can be provided via the `sx` prop

```tsx
<Component sx={{ color: "red" }} />
```
