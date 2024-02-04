# react-styled-factory

Abstract utility for creating typesafe styled [React](https://reactjs.org/) components without having to do the type and props wiring. Intended (but not limited) to be used together with a css compiler like [vanilla-extract](https://vanilla-extract.style).

## Defining components

Use the provided factory to create a `styled` function that you will use to create react components.

```tsx
import { createStyledFactory } from "react-styled-factory";

export const styled = createStyledFactory();
```

Use the styled function to produce a React component:

```tsx
import { styled } from "./styled";

const Component = styled("div");

<Component style={{ color: "red" }} data-foo="123">
  Hello World
</Component>; // <div style="color: red;" data-foo="123">Hello World</div>
```

Custom components can be used as well:

```tsx
import { HTMLAttributes } from "react";

function Impl(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} />;
}

const Component = styled(Impl);

<Component>Foo</Component>; // <span>Foo</span>
```

(Optional) Provide an sx compiler (i.e. [@vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/)) to the factory if you want to enable the `sx` prop on all components:

```tsx
// styled.ts
import { createStyledFactory } from "react-styled-factory";
import { sprinkles } from "./styles.css.ts";

export const styled = createStyledFactory(sprinkles);

// Component.tsx
import { styled } from "./styled";

const Component = styled("div");

<Component sx={{ color: "primary", pt: "large" }} />;
// <div class="color-red padding-top-large"></div>
```

## Styling components

Provide a class name compiler (i.e. [@vanilla-extract/recipes](https://vanilla-extract.style/documentation/packages/recipes/)) to automatically convert specific props to class names:

```tsx
// styles.css.ts
import { recipe } from "@vanilla-extract/recipes";

export const myRecipe = recipe({
  variants: {
    size: {
      small: { fontSize: "10px" },
      large: { fontSize: "20px" },
    },
    color: {
      primary: { color: "blue" },
      secondary: { color: "red" },
    },
  },
});

// Component.tsx
import { myRecipe } from "./styles.css.ts";

const Component = styled("div", myRecipe);

<Component size="large" color="primary" />;
// <div class="size-large color-primary"></div>
```

You can also pass in plain class names for simpler components:

```tsx
const Component = styled("div", "my-css-class");

<Component />; // <div class="my-css-class"></div>
```

This integrates well with i.e. [@vanilla-extract/css](https://vanilla-extract.style/documentation/api/style/):

```tsx
// styles.css.ts
import { style } from "@vanilla-extract/css";

export const myClass = style({ color: "red" });

// Component.tsx
import { myClass } from "./styles.css.ts";

const Component = styled("div", myClass);
```

## Composing components

Styled components support merging with the immediate child:

```tsx
const Component = styled("div", "my-css-class");

<Component asChild>
  <span>Hello World</span>
</Component>; // <span class="my-css-class">Hello World</span>
```

You can also produce a new component, identical but with the inner component changed:

```tsx
// Component.tsx
export const Component = styled("div", "my-css-class");

// NewComponent.tsx
import { Component } from "./Component";

const NewComponent = Component.as("span");

<NewComponent />; // <span class="my-css-class"></span>
```

You can embed default props by using the `attrs` function:

```tsx
const Component = styled("div").attrs({ role: "button" });

<Component />; //  <div role="button"></span>
<Component role="alert" />; // <div role="alert"></span>
```

By default, variant props will be filtered and not passed to the inner component. You can override this behavior by using `shouldForwardProp`:

```tsx
// Dialog.css.ts
import { recipe } from "@vanilla-extract/recipes";

export const dialogRecipe = recipe({
  base: {
    transition: "opacity 0.3s",
  },
  variants: {
    open: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
});

// Dialog.tsx
import { dialogRecipe } from "./Dialog.css.ts";

const Dialog1 = styled("dialog", dialogRecipe);

// "open" will be interpreted and generate a class,
// but will not be passed to the inner component
<Dialog1 open />; // <dialog class="open-true"></dialog>

const Dialog2 = styled("dialog", dialogRecipe).shouldForwardProp(
  ({ name, isVariant }) => !isVariant || name == "open",
);

// Here "open" will be both used to generate a class
// and be passed to the inner component
<Dialog2 open />; // <dialog class="open-true" open></dialog>
```
