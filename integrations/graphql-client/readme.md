# GraphQL Client

A [graphql](https://graphql.org/) client for the [graphql-server](../../apps/graphql-server) app.

The react hooks require a [@yas/query-client](../query-client) to be provided by a parent component.

> Uses [urql](https://commerce.nearform.com/open-source/urql/) under the hood

## tsconfig.json

Add the following to the `tsconfig.json` of any package that wants to use `graphql-client`:

```json
{
  "extends": [
    "@yas/tsconfig/react.json", //Use whichever base config you want.
    "@yas/graphql-client/tsconfig.graphql.json" // This enables the LSP plugin
  ]
}
```
