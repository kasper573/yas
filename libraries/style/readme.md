# @yas/style

A React & CSS (web) implementation of @yas/design-tokens.

Provides utilities to define styles and react components in a type-safe manner while enforcing and making it easy to use our design tokens.

## Usage

Most utilities come from [@vanilla-extract](https://vanilla-extract.style/). Refer to their documentation for more information.

All APIs are available as the main export of the package:

```tsx
import { style, recipe, assignInlineVars, styled } from "@yas/style";
```

There's also a number of custom utilities available that's available via the main export of the package.

See the [utils source code][src/utils] for a complete list of utilities and their documentation.

### How to create a styled react component

Use the `styled` function from the main export of the package:

```tsx
// Foo.tsx
import { styled } from "@yas/style";
import * as styles from "./Foo.css";

export const Foo = styled("div", styles.foo);
// <Foo/> would render <div className={styles.foo}/>
```

More information about the `styled` function is [available in its repository](https://www.npmjs.com/package/react-styled-factory);

### Styling convention

We have several ways of defining css values, and each has its own use case, benefits and drawbacks. You should adopt the mental model of always prioritizing the most abstract and reusable way of defining styles, and only use the more concrete and less reusable ways when you have to. This will make our codebase more consistent and maintainable.

The ways of defining css values are, in order of priority:

#### Atomic CSS

We use [@vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) for atomic css. This is the preferred way of defining styles. See [src/atoms.css.ts] for a reference of all available atomic css properties.

```typescript
import { atoms } from "@yas/style";

export const root = atoms({
  typography: "body",
  backgroundColor: "surface_main.base",
  color: "surface_main.on",
});
```

#### Using theme variables

Most atomic css properties already use our theme variables internally, so most of the time you don't need to worry about them. However, sometimes you need to access theme variables programmatically, in which case you can import the `theme` object, which is our [Vanilla Extract Theme Contract](https://vanilla-extract.style/documentation/api/create-theme-contract/) that implements the themes from `@yas/design-tokens`.

A common use case is when you have a custom variable that you want to assign a theme variable value to:

```typescript
import { createVar, recipe, style, theme } from "@yas/style";

const myColorVar = createVar();

export const parent = recipe({
  base: {
    borderColor: myColorVar,
  },
  variants: {
    active: {
      true: {
        vars: {
          [myColorVar]: theme.color.primary.Default,
        },
      },
      false: {
        vars: {
          [myColorVar]: theme.color.info_prominent.active,
        },
      },
    },
  },
});

// When this is a child to parent, it will inherit the borderColor from the parent,
// but the parent will be able to control its value through the active variant.
export const child = style({
  borderColor: myColorVar,
});
```

#### Using design tokens

If you wish to use arbitrary design tokens directly, use [@yas/design-tokens](../design-tokens/).

However, it can't be stated enough that you should avoid this at all costs. Having an escape hatch is really important to ensure we're never blocked, but the mental model should be that all unsafe styles or direct dependency on design tokens should be temporary and are immediately be considered technical debt that should undergo refactoring ASAP.

#### Plain CSS values

As a last resort, you can use plain css values. This is the least reusable and maintainable way of defining styles, and should be avoided at all costs.

```ts
import { style } from "@yas/style";

export const myStyle = style({
  backgroundColor: "red",
});
```

### Installing themes in your app

We use [vanilla extract themes](https://vanilla-extract.style/documentation/theming/). You need to import the themes you want to use in your application and apply their class names where you want them to have effect:

```tsx
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";

type ThemeName = keyof typeof themes;
const themes = { dark, light };

function App() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <div className={theme}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}
```

### Root styles

It's recommended you use set typography and color styles in the root element of your app, since these styles are by convention often inherited by components.

```typescript
// App.css.ts
import { atoms } from "@yas/style";

export const root = atoms({
  typography: "body",
  backgroundColor: "surface_main.base",
  color: "surface_main.on",
});
```

```tsx
// App.tsx
import { dark } from "@yas/style/themes/dark.css";
import { root } from "./App.css";

function App() {
  return (
    <div className={`${dark} ${root}`}>
      <p>Some text</p>
    </div>
  );
}
```

### Global styles

It's best to avoid using `globalStyle` if you can, as it often leads to difficult maintenance. If you need to use it, use it sparingly, preferably only for things that absolutely have no other solution.
