# Yet Another Stack &middot; [![status](https://github.com/kasper573/yas/actions/workflows/build_test_release.yml/badge.svg)](https://github.com/kasper573/yas/actions)

A Typescript & React specific full stack monorepo template for large scale web development with heavy focus on type safety and strict architecture without sacrificing developer experience.

> Also serves as an [incubation](#incubations) repository for experimenting with new ideas and technologies.

## Stack

Here's a quick overview of the most notable tools and libraries used in this stack. A lot of them are encapsulated in their own packages, so make sure you check out each package's documentation for more information.

- Tools

  - [pnpm](https://pnpm.io/) for package management.
  - [turborepo](https://turbo.build/repo) for monorepo management.
  - [Vite](https://vitejs.dev/) for bundling and development server.
  - [Vitest](https://vitest.dev/) for unit testing.
  - [Storybook](https://storybook.js.org/) for component development and testing
  - [Playwright](https://playwright.dev/) for end-to-end testing.
  - [ESLint](https://eslint.org/) for code linting.
  - [Prettier](https://prettier.io/) for code formatting.

- Notable libraries

  - [Vanilla Extract](https://vanilla-extract.style/) for styling.
  - [tRPC](https://trpc.io/) for API server and client.
  - [GraphQL](https://graphql.org/) for API server and client.
  - [Radix UI](https://www.radix-ui.com/) for component primitives.
  - [Tanstack Query](https://tanstack.com/query) wrapper around both GraphQL & tRPC for a unified data fetching interface.
  - [Tanstack Router](https://tanstack.com/router) for routing.
  - [react-hook-form](https://react-hook-form.com/) for form state management.
  - [zod](https://github.com/colinhacks/zod) for runtime type validation.
  - [date-fns](https://date-fns.org/) for date manipulation.
  - [react-pdf](https://react-pdf.org/) for PDF generation.

## Quick start

- Clone this repository
- Run `pnpm install`
- Run `pnpm dev` to start all development servers. Links to all apps will be displayed in the terminal.

## Conventions

- The repository root should only hold global tooling and configuration files.
- Decouple your apps and packages.
- Keep packages small and focused.
- Prefer [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages)
- Utilize shared configuration (e.g. [@yas/tsconfig](core/tsconfig), [@yas/env](core/env), [@yas/env](core/test)).
- Encapsulate packages (e.g. [@yas/style](libraries/style), [@yas/query](libraries/query), [@yas/validate](libraries/validate)).
- Enforce conventions wherever possible (i.e. eslint, prettier, or [custom scripts](core/scripts)).
- Each non-trivial package should provide its own documentation.

## Scripts

The following scripts are available in the root of the repository and will run the same script in each package.

- `dev` Starts any and all tools required during development in watch mode (i.e. a development webserver, or code generators, etc.). If applicable, should display URL to app in terminal.
- `build` Builds the app or package
- `test` Runs the test runner in headless mode, once.
- `test:watch` Starts the test runner in watch mode

### Script conventions

- Each script should exit with a non-zero exit code if they fail.
- Each package may implement these scripts differently, as long as they satisfy the given use case.
- A package may opt out of these scripts, but you must not rename them. This is to ensure consistency across packages.

### Global scripts

The following scripts are only available in the root of the repository and will affect all packages.

- `lint` Checks for code style errors.
- `lint:fix` Fixes code style errors (where possible)
- `format` Formats code.
- `format:fix` Formats code and fixes code style errors (where possible)

## Packages

Packages should follow these naming conventions:

- package.json name must have `@yas/` prefix

Exceptions apply:

- Packages that must follow a 3rd party naming convention (i.e. `eslint-*`).
- Incubation packages should be named whatever they plan to register as on npm.

### Package layers

Packages are grouped into categories that represent architectural layers imposing this rule:

**Lower layers should not depend on higher layers**.

> This is enforced using `pnpm depcheck`

These are the layers, from top to bottom:

#### [apps](apps)

Deployables (`build` script must output deployable artifacts, preferably using some standard)

#### [integrations](libraries)

Integrations with services (i.e. api clients).

#### [libraries](libraries)

Building blocks for creating apps.

#### [core](core)

Low level tooling for building apps and libraries. Should mostly be out of your way and not something you interact with directly.

#### [incubations](incubations)

Experimental packages. If they become stable, they will be extracted into their own repository.

> If you fork this repo, you should strive not to make any changes to these packages. Ideally, once this repo is production ready, there will be no incubation packages at all.
