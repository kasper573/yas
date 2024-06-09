# design-tokens

The design tokens are the smallest building blocks our designers use to create designs.

This package aims to be an exact 1:1 implementation of the design tokens that are used by the designers and should be the source of truth for all design related code.

This package must be framework and rendering engine agnostic, meaning i.e. no `react` or `css` specific code should be present.

## Single source of truth

Figma is our single source of truth for design tokens. Whenever our designers have updated their design tokens in figma it is our responsibility to update this package with the same values.

While this can be done manually, we expedite the process by exporting the design tokens definitions from figma, and then generate a typescript representation from that definition:

1. Use the [Json Exporter](https://www.figma.com/community/plugin/1365868080931980869/json-exporter) plugin to export our design tokens as json.

2. Run `pnpm codegen <path-to-exported-json-file>` in this package

3. In case of significant changes in the design tokens you will have to fix errors.
   Our tokens and styles are type safe so the compiler will be able to detect what is broken.

> This is a good use case for `pnpm typecheck` in the root of the repository to easily check all packages for errors.

4. Commit your changes
