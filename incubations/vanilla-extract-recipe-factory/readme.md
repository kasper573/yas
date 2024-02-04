# vanilla-extract-recipe-factory

Create your own [recipe function](https://vanilla-extract.style/documentation/packages/recipes/), but control how styles are compiled.

> Heads up: This package does not follow semantic versioning. Changes of all types are released to the patch portion of the version string.

```tsx
import { createRecipeFactory } from "vanilla-extract-recipe-factory";

const createRecipe = createRecipeFactory(yourStyleCompiler);

export const yourRecipe = createRecipe({
  // Accepts the same interface as regular recipes,
  // but with the style inputs supported by your compiler
});
```
