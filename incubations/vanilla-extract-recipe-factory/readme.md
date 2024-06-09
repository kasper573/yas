# vanilla-extract-recipe-factory

Create your own [recipe function](https://vanilla-extract.style/documentation/packages/recipes/), but control how styles are compiled.

[Try it on StackBlitz](https://stackblitz.com/edit/vanilla-extract-recipe-factory)

> Heads up: This package does not follow semantic versioning. Changes of all types are released to the patch portion of the version string.

```ts
// design-tokens.ts
import { createRecipeFactory } from "vanilla-extract-recipe-factory";

export const recipe = createRecipeFactory(yourStyleCompiler);
```

```ts
// my-style.css.ts
import { recipe } from "./design-tokens";

export const yourRecipe = recipe({
  // Accepts the same interface as regular recipes,
  // but with the style inputs supported by your compiler
});
```

Designed (but not limited) to be used with [@vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) or [vanilla-extract-constrained](https://www.npmjs.com/package/vanilla-extract-constrained):

```ts
// design-tokens.ts
import { createRecipeFactory } from "vanilla-extract-recipe-factory";
import { sprinkles } from "./sprinkles.css.ts";

export const recipe = createRecipeFactory(sprinkles);
```

```ts
// my-style.css.ts
import { recipe } from "./design-tokens";
export const yourRecipe = recipe({
  base: {
    // sprinkles
  },
  variants: {
    foo: {
      bar: {
        // sprinkles
      },
    },
  },
});
```
