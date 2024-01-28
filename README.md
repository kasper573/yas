# Yet Another Stack &middot; [![status](https://github.com/kasper573/yas/actions/workflows/ci.yml/badge.svg)](https://github.com/kasper573/yas/actions)

A Typescript & React specific full stack monorepo template for large scale web development with heavy focus on type safety and strict architecture.

> Also serves as an [incubation](#incubations) repository for experimenting with new ideas and technologies.

Add thing

## Quick start

- Clone this repository
- Run `pnpm install`
- Run `pnpm dev` to start all development servers. Links to all apps will be displayed in the terminal.

## Conventions

- The repository root should only hold global tooling and configuration files.
- Decouple your apps and packages.
- Keep packages small and focused.
- Prefer [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages)
- Utilize shared configuration (e.g. [@yas/tsconfig](core/yas-tsconfig), [@yas/env](core/yas-env)).
- Encapsulate packages (e.g. [@yas/style](libraries/yas-style), [@yas/validate](libraries/yas-validate)).
- Enforce conventions wherever possible (i.e. eslint, prettier, etc.).
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

- Package folder names must have `yas-` prefix
- package.json name must have `@yas/` prefix

Exceptions apply:

- Packages that must follow a 3rd party naming convention (i.e. `eslint-*`).
- Incubation packages may have whatever name they want.

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
