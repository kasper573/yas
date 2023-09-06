# Yet Another Stack

My personal stack of apps and libraries.

## Monorepo conventions

This is a [turborepo](https://turbo.build/repo) focusing on strict conventions,
type safety, testing and code sharing between packages.

- The repository root should only hold global tooling and configuration files.
- Decouple your apps and packages.
- Keep packages small and focused.
- For shared configuration, create a package (e.g. [@yas/tsconfig](packages/yas-tsconfig)).

### Scripts

The following scripts are available in the root of the repository and will run the same script in each package.

- `dev` Starts any and all tools required during development in watch mode (i.e. a development webserver, or code generators, etc.). If applicable, should display URL to app in terminal.
- `build` Builds the app or package
- `test` Runs the test runner in headless mode, once.
- `test:watch` Starts the test runner in watch mode

#### Script conventions

- Each script should exit with a non-zero exit code if they fail.
- Each package may implement these scripts differently, as long as they satisfy the given use case.
- A package may opt out of these scripts, but you must not rename them. This is to ensure consistency across packages.

#### Global scripts

The following scripts are only available in the root of the repository and will affect all packages.

- `lint` Checks for code style errors.
- `lint:fix` Fixes code style errors (where possible)
- `format` Formats code.
- `format:fix` Formats code and fixes code style errors (where possible)

### Applications

- Located in <projectRoot>/apps/
- Folder names needs no prefixes
- package.json name must have `@yas/` prefix
- `build` script must output deployable artifacts (preferably using some standard)

### Packages

- Located in <projectRoot>/packages/
- For `YAS` specific packages (i.e. encapsulations, shared config, etc):
  - Folder names must have `yas-` prefix
  - package.json name must have `@yas/` prefix
