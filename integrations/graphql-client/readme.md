# React client for @yas/graphql-server

Combines [@yas/client](../../libraries/query) and [gql.tada](https://gql-tada.0no.co/) into a react client for the [graphql-server](../../apps/graphql-server) app.

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
