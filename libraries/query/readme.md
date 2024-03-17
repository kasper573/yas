# Query

An encapsulation of [Tanstack Query](https://tanstack.com/query) for React.

We use the query client as the centralized client for all kinds of data fetching, whether it's REST, RCP or GraphQL. This is an intentional tradeoff that promotes simplicy and consistency at the expense of cache utilization:

- No optimistic cache update logic
- No cache invalidation logic
- Consistent error handling
- Same devtools for all requests
