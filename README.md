# Yet Another Stack &middot; [![status](https://github.com/kasper573/yas/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/kasper573/yas/actions)

A Typescript & React specific full stack monorepo template for large scale web development with heavy focus on type safety and strict architecture without sacrificing developer experience.

> Also serves as an [incubation](#incubations) repository for experimenting with new ideas and technologies.

## Notable feature highlights

1. Shows how to roll your own [framework agnostic design system](libraries/design-tokens), with separate platform integrations like a [web based ui component library](libraries/ui) or a [PDF renderer](libraries/pdf), both based on the same design system but not limited by each others concerns. This is an extensible pattern that be continued to i.e. implement consistent design system bindings for react-native, webgl, email rendering, or anything really.

2. Shows how organize and separate concerns among a multitude of packages in a monorepo, i.e. by enforcing a [layered architecture](#layered-architecture) using [dependency-cruiser](https://www.npmjs.com/package/dependency-cruiser), and shows several examples on modularization: above mentioned design system, and both a tRPC and GraphQL server divided into separate [server](apps/graphql-server), [client](integrations/graphql-client) and UI packages.

3. Superb developer experience with fast and reliable tooling with respect our human limitations: The compiler and editor should do the heavy lifting, and while memorizing conventions is important, you should be allowed to forget and be reminded by the tools when you make a mistake, without any exceptions. The philosophy is that you should just clone this repository and start coding, and the tools will guide you to the right path.

## Stack

Here's a quick overview of the most notable tools and libraries used in this stack. A lot of them are encapsulated in their own packages, so make sure you check out each package's documentation for more information.

### Tools

- [pnpm](https://pnpm.io/) for package management.
- [turborepo](https://turbo.build/repo) for monorepo management.
- [Vite](https://vitejs.dev/) for bundling and development server.
- [Vitest](https://vitest.dev/) for unit testing.
- [Storybook](https://storybook.js.org/) for component development and testing
- [Playwright](https://playwright.dev/) for end-to-end testing.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io/) for code formatting.

### Notable libraries

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

### Pipeline

There's also a robust CI/CD pipeline set up for this repository, which includes:

- Conventional commits
- Code quality checks
- Build and test automation with artifacts

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
- Each package should be prebuilt with `tsc` (Exceptions can be made, see [layered archiveture](#layered-architecture) below)
- Utilize shared configuration (i.e. [@yas/tsconfig](core/tsconfig), [@yas/env](core/env), [@yas/test](core/test)).
- Encapsulate packages (i.e. [@yas/style](libraries/style), [@yas/query-client](integrations/query-client), [@yas/validate](libraries/validate)).
- Each non-trivial package should provide its own documentation.
- Enforce conventions: use i.e. eslint, prettier, or [custom scripts](core/scripts) (see rant blow).

### A rant on enforcing conventions

<details>
<summary>Read the rant</summary>

I am a firm believer that a convention that is not enforced quickly becomes nothing more but a suggestion.

**And the best way to enforce a convention is to automate it.**

While the industry has adopted tools like `eslint` and `prettier` to automatically enforce certain conventions with great success,
there's still too many conventions being handwaved "oh, we'll deal with that in code review",
only to be forgotten, or done poorly. We are forgetful, inconsistent and biased. Relying on people to enforce conventions can quickly become an aggravating waste of time and energy.

Ways of how people can fail to follow conventions include (but are not limited to):

- The convention wasn't documented.
- The documentation was outdated.
- People didn't read the documentation.
- People forgot about the convention.
- People didn't care about the convention.
- People didn't understand the convention.
- People didn't have time to enforce the convention.

Here's my workflow on how to turn a convention into something that can be automated:

1. If your convention doesn't exist as an eslint rule: write one!
2. If eslint is not applicable, use another linting tool, like [stylelint](https://stylelint.io/) or [dependency-cruiser](https://www.npmjs.com/package/dependency-cruiser).
3. If there is no linting tool for your convention, write a [custom script](core/scripts)!
4. If the convention simply cannot be automated, then try to change it into something that can be. Often you can make a compromise for the sake of consistency, but still provide similar value.
5. If it truly is impossible to automate, at this point it's time to ask yourself how useful this convention really is. The inability to systematically enforce a software convention is in of itself often a sign that the convention is flawed. Not always, but it may very well be a red flag. You've got two options here:
   - Change the system itself so that the convention is no longer needed or can be automated.
   - Drop the convention and acknowledge that it's a suggestion, not a rule.

</details>

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

**Each script must exit with a non-zero exit code if they fail.**

The root package have these scripts defined as well and is configured to automatically run these scripts for all packages in the repository, which will be your primary way of interacting with these scripts, but you can also run them manually in a package if you need to.

## Packages

Packages should follow these naming conventions:

- package.json name must have `@yas/` prefix

Exceptions apply:

- Packages that must follow a 3rd party naming convention (i.e. `eslint-*`).
- Incubation packages should be named whatever they plan to register as on npm.

## Layered architecture

Package workspace folders are used as categories that represent architectural layers imposing this rule:

**Lower layers should not depend on higher layers**.

> This is enforced using [dependency-cruiser](https://www.npmjs.com/package/dependency-cruiser)

These are the layers, from top to bottom:

#### [apps](apps)

Deployables (`build` script must output deployable artifacts, preferably using some standard)

> Since apps may use any framework, they will have their own build/dev scripts, so you don't have to use `tsc` for apps.

#### [integrations](libraries)

Integrations with services (i.e. api clients).

#### [libraries](libraries)

Building blocks for creating apps.

#### [core](core)

Low level tooling for building apps and libraries. Should mostly be out of your way and not something you interact with directly.

> Most of core packages are shared configs and developer tooling and provide little to no runtime code. These packages may therefore skip prebuilding with `tsc`, since that is a performance optimization primarily intended for runtime code.

#### [incubations](incubations)

Experimental packages. If they become stable, they will be extracted into their own repository. Ideally, this folder should be empty.

> Note: I may be experimenting with some technologies of my own in this repository. The incubation packages that reside in the repository are not considered part of the template and may or may not be stable or production ready. These are my personal experiments, and while I believe in them, they may fail. If I decide to remove them, I will refactor the places they are used in the repository to use a 3rd party equivalent instead.
