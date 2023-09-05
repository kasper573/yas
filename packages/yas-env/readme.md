# yas-env

Monorepo specific env convention:

Environment variables may not be accessed outside of `<packageRoot>/src/env.{ts|js}`.
Instead, read from the environment only in those files and store the values in a variable that you export.
It's recommended you also validate/parse/transform your env values in those files.
It's okay to throw validation errors. yas-env will catch the errors and print them to the console.

This way, we can have centralized, type safe and build time validated env variables.

## Usage

To load and validate env variables before running any command,
add `yas-env` to your package and prefix your commands with `yas-env`:

```json
{
  "scripts": {
    "start": "yas-env start",
    "build": "yas-env build",
    "test": "yas-env test"
  }
}
```
