# React client for @yas/graphql-server

This is a React specific [urql](https://commerce.nearform.com/open-source/urql/) client for the [graphql-server](../../apps/graphql-server) app, using [gql.tada](https://gql-tada.0no.co/) for inferred type safe `graphql` statements and code generation.

The react hooks require a [@yas/client](../../libraries/query) to be provided by a parent component.

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
