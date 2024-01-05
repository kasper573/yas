# react-styled-factory

Abstract utility for creating typesafe styled [React](https://reactjs.org/) components without having to do the type and props wiring. Intended (but not limited) to be used together with a css compiler like [vanilla-extract](https://vanilla-extract.style).

## Usage

Use the provided factory to create a `styled` function that you will use to create react components.

> (Optional) Provide an sx compiler if you want to enable the `sx` prop.

```tsx
import { createStyledFactory } from "react-styled-factory";
import { sprinkles } from "./styles.css.ts"; // @vanilla-extract/sprinkles works as sx compiler

export const styled = createStyledFactory(sprinkles);
```

Use the styled function to produce a React component:

```tsx
import { styled } from "./styled";

const Component = styled("div");

// Now accepts SX prop. The value is the input to send to the sx compiler.
<Component sx={...}>
```

Custom components can be used as well:

```tsx
const Component = styled(Impl);

function Impl (props) {
  return <div {...props}>
}
```

Provide a class name compiler to automatically convert specific props to class names:

```tsx
import { myRecipe } from "./styles.css.ts"; // @vanilla-extract/recipes works as class name compiler

const Component = styled("div", myRecipe);

// The props that are understood by the compiler will be handled by the compiler,
// the rest will be passed to the underlying component.
<Component size="large" color="primary" />;
```
