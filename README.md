# Yet Another Stack

My personal stack of apps and libraries.

The libraries are tools that I have found myself rewriting over and over again over the years
and after enough iterations I decided to make them into libraries.

The apps are either example projects demonstrating how to use the libraries,
or apps that I created to make use of myself.

This project is also a demonstration of how I like to run monorepos,
showcasing strict conventions, type safety and testing,
with a heavy focus of code sharing between packages.

## Monorepo conventions

- The repository root should only hold global tooling and configuration files.
- Decouple your apps and packages.
- Keep packages small and focused.
- For shared configuration, create a package (e.g. [@yas/tsconfig](packages/yas-tsconfig)).

### Scripts

It's important that each package uses the same script names for the same use cases. If a package is in need any of these use cases, it must use these exact script names:

- `dev` Starts the development server (and other tools, like code generators) in watch mode. Displays URL to app in terminal.
- `build` Builds the package for production (Not required for development, but useful to be aware of)
- `lint` Checks for code style errors.
- `lint:fix` Fixes code style errors (where possible)
- `test` Runs the test runner in headless mode, once.
- `test:watch` Starts the test runner in watch mode

A general rule of thumb is that scripts should exit with a non-zero exit code if they fail.

> Each package may implement these scripts differently, as long as they solve the given use case.

<details>
<summary>
What are monorepo scripts and how do I use them?
</summary>

> While we have separate folders for `apps` and `packages`,
> mentions of "package" below is referring to both.

The only difference between monorepo scripts and regular npm scripts is convention:

In the [root package.json](package.json), we define scripts just like a regular node project.
The difference is that these scripts in turn trigger a monorepo CLI (in our case [turbo](https://turbo.build/))
that run each script for all packages while automatically providing various developer experience improvements.

How you run scripts is a matter of preference. You can do any of the following:

- Run `pnpm <script>` in the root of the monorepo to run the given script for all packages.
- Run `pnpm --filter <package> <script>` in the root of the monorepo to run the given script for a specific package.
- Run `pnpm <script>` in the root of a package to run the given script for that package.

</details>
