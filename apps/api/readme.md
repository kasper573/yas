# GraphQL API

A [type-graphql](https://typegraphql.com/) based GraphQL API.
Deployed as a serverless function on Vercel.

## House rules

- Must be stateless.
- Facade only. No business logic.
- Modular architecture.

## Module convention

- Each module must be a separate folder under `src/modules`.
- Place type-graphql's `ObjectType` and `InputType` definitions in a `<moduleName>.types.ts` file.
- Place type-graphql's `Resolver` definition in a `<moduleName>.resolver.ts` file.
- The rest of the modules code is up to you.

## GraphQL Client SDK

The GraphQL client is a [GQTY](https://gqty.dev/) client that is automatically derived from the server definition.

> Note that GraphQL client artifacts are generated automatically while the dev server is running. These should be committed to git.

Apps may use the client SDK like this:

```ts
// apps/your-app/src/api.ts
import { createGQTYClient } from "@yas/api";
import { env } from "./env";

// This creates a regular GQTY client, but with our artifacts. See https://gqty.dev/ for more information
const client = createGQTYClient(env.apiUrl);

// Export what you want to use in your app
export const {
  useQuery,
  useMutation,
  /* ... plus more utilities you may choose from */
} = client;
```
