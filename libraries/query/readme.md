# Query

An encapsulation of [Tanstack Query](https://tanstack.com/query) for React.

Most things are the same, but there are a few differences:

You may not use the `QueryClient` class directly. Instead you should use the `createQueryClient` factory,
which will produce a `QueryClient` instance that is configured with our opinionated defaults.
