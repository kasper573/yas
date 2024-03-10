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

There's also a robust CI/CD pipeline set up for this repository, which includes:

- Conventional commits
- Code quality checks
- Build and test automation with artifacts
- Automated releases to npm

### Deployment

This repository is designed to be agnostic to deployment strategy and hosting platform, so it contains no deployment scripts or major host specific details and instead relies on a deployable artifacts convention.

Each app or package that aims to be deployed has a `build` script that will produce its depoyable artifact according to that particular app or package's framework, and expects you to configure the deployment process either yourself after forking this repository, or by using a pull based deployment platform like Vercel, Netlify, or AWS Amplify.

To ensure deployment compatibility, this repository is dogfooding above mentioned process by deploying all the apps in the `apps` directory to Vercel on a pull based deployment model.

## Quick start

- Clone this repository
- Run `pnpm install`
- Run `pnpm dev` to start all development servers. Links to all apps will be displayed in the terminal.

## Conventions

- The repository root is reserved for global configuration files. Use workspaces for everything else.
- Keep packages small and focused.
- Decouple your packages.
- Prefer [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages)
- Utilize shared configuration (e.g. [@yas/tsconfig](core/tsconfig), [@yas/env](core/env), [@yas/test](core/test)).
- Encapsulate packages (e.g. [@yas/style](libraries/style), [@yas/query](libraries/query), [@yas/validate](libraries/validate)).
- Enforce conventions (i.e. eslint, prettier, or [custom scripts](core/scripts)).
- Each non-trivial package should provide its own documentation.

## Root-level only scripts

The following scripts are only available in the root of the repository but will apply to the entire codebase:

- `lint` Checks for code style errors.
- `lint:fix` Fixes code style errors (where possible)
- `format` Formats code.
- `format:fix` Formats code and fixes code style errors (where possible)

## Package scripts

These scripts are part of a convention. Individual packages may have their own scripts that are not listed here that may do other things, but these are the ones that are expected to be consistent across all packages. Packages may opt in to have the following scripts:

- `dev` Starts any and all tools required during development in watch mode (i.e. a development webserver, or code generators, etc.). If applicable, should display URL to app in terminal.
- `build` Builds the app or package into a deployable artifact according to the package's framework.
- `test` Runs the test runner in headless mode, once.
- `test:watch` Starts the test runner in watch mode for development.
- `release` Releases the package to npm.

**Each script must exit with a non-zero exit code if they fail.**

The root package have these scripts defined as well and is configured to automatically run these scripts for all packages in the repository, which will be your primary way of interacting with these scripts, but you can also run them manually in a package if you need to.

## Packages

Packages should follow these naming conventions:

- package.json name must have `@yas/` prefix

Exceptions apply:

- Packages that must follow a 3rd party naming convention (i.e. `eslint-*`).
- Incubation packages should be named whatever they plan to register as on npm.

## Layered architecture

To promote low coupling and high cohesion, package workspace folders are used as categories that represent architectural layers imposing this rule:

**Lower layers should not depend on higher layers**.

> This is enforced using [dependency-cruiser](https://www.npmjs.com/package/dependency-cruiser)

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

Experimental packages. If they become stable, they will be extracted into their own repository. Ideally, this folder should be empty.
