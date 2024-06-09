# pdf

An encapsulation of [react-pdf](https://react-pdf.org/) that's been integrated with [@yas/design-tokens](../design-tokens).

The usage is identical to the original library, except that an `sx` property has been added to each component. `sx` is an enhanced `style` property that has support for our design tokens.

> Note that `react-pdf` only supports inline styles and a subset of CSS, which is why this package only integrates with our design tokens, and not the entire style library.
