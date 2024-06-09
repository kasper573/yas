## Storybook

We use [storybook](https://storybook.js.org/) to iterate on and test UI components.

This package does not contain any stories.

Stories are loaded from the rest of the repository.

Run `pnpm --filter storybook dev` to start the storybook

### Adding and testing stories

Add [@yas/test](../core/test) in your package.json.

Create `.stories.tsx` files anywhere inside your package.

Testing utilities are available via [@yas/test](../core/test).
