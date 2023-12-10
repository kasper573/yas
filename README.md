# Yet Another Stack &middot; [![status](https://github.com/ksandin/yas/actions/workflows/ci.yml/badge.svg)](https://github.com/ksandin/yas/actions)

A Typescript & React specific full stack monorepo template aimed towards large scale development (but not enterprise level). Heavy focus on good DX, strict architecture, enforced conventions, type safety, testing and easy code sharing between packages.

> Also serves as a personal playground and incubation repository for me to build apps and packages and experiment with new ideas and technologies. This means that some of the more specific apps and packages will come and go over time, but the generic low level packages will remain. If a package is irrelevant to you, simply fork and modify/remove to your liking.

## Conventions

- The repository root should only hold global tooling and configuration files.
- Decouple your apps and packages.
- Keep packages small and focused.
- Prefer [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages)
- Utilize shared configuration (e.g. [@yas/tsconfig](core/yas-tsconfig), [@yas/env](core/yas-env)).
- Encapsulate packages (e.g. [@yas/style](libraries/yas-style), [@yas/validate](libraries/yas-validate)).
- Enforce conventions wherever possible (i.e. eslint, prettier, etc.).
  > A convention that has to be remembered will eventually be forgotten.

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

For `YAS` specific packages (i.e. encapsulations, shared config, etc), the following rules apply:

- Folder names must have `yas-` prefix
- package.json name must have `@yas/` prefix

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

> This is an exception to the layering rule. `core` and `libraries` are considered to be on the same layer, and are separated only to communicate that `core` packages are more sensitive to changes.
