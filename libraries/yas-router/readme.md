# Router

An encapsulation of the [Tanstack Router](https://tanstack.com/router) library. Refer to their documentation.

Only selected parts of the tanstack router API is exposed. Most notably are you expected to only use the [RouteApi](https://tanstack.com/router/v1/docs/api/router/RouteApiClass) to loosely couple your components with the route tree. Most other hooks are not exposed.

## Custom routing utilities

- [useSearchState](./src/useSearchState.ts)
