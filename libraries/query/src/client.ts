import { QueryClient } from "@tanstack/react-query";

export function createQueryClient(
  mode: "production" | "development",
): QueryClient {
  const query: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: mode === "production",
      },
      mutations: {
        // Invalidate all queries on successful mutations for simple cache invalidation
        // with great DX at the expense of (an acceptable amount of) redundant requests.
        onSettled(_, error) {
          if (!error) {
            query.invalidateQueries();
          }
        },
      },
    },
  });

  return query;
}
