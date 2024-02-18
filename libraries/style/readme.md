# @yas/style

CSS/DOM implementation of [@yas/design-system](../design-system/). Implemented using [Vanilla Extract](https://vanilla-extract.style), [vanilla-extract-constrained](../../incubations/vanilla-extract-constrained) and [react-styled-factory](../../incubations/react-styled-factory).

All styling must be done using typesafe `.css.ts` files.

You should prioritize using the [theme variables](src/variables.css.ts) over directly using design tokens from `@yas/design-system`. You should definitely avoid using arbitrary css values, but if you absolutely have to, escape hatches are available in [unsafe.ts](src/unsafe.ts) that allow you to use the unconstrained vanilla extract primitives with any values you want.

Also provides additional style related utilities, such as [breakpointQuery](./src/utils/breakpointQuery.ts) and [gridAreas](./src/utils/gridAreas.ts).
