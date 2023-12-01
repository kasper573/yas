import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import type { ApiRouter } from "@yas/api";
import { createContext, useContext } from "react";
import { err, unwrapUnsafe_useWithCaution } from "@yas/result";

/**
 * Convenience proxy for accessing the client interface
 * of the API without having to call useContext first.
 */
export const api = new Proxy({} as ApiClient["trpc"], {
  get: function useApi(_, key) {
    const trpc = useContext(ApiContext);
    return trpc[key as keyof ApiClient["trpc"]];
  },
});

export const ApiContext = createContext<ApiClient["trpc"]>(
  new Proxy({} as ApiClient["trpc"], {
    get() {
      // Using unsafe unwrap to panic early to clearly indicate that context is misconfigured
      unwrapUnsafe_useWithCaution(
        err(
          new Error(
            "You must wrap components using the api with an ApiClientProvider",
          ),
        ),
      );
    },
  }),
);

export type ApiClient = ReturnType<typeof createApiClient>;

export function createApiClient(url: string) {
  const queryClient = new QueryClient();
  const trpc = createTRPCReact<ApiRouter>();
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url })],
  });

  return { queryClient, trpcClient, trpc };
}

export function ApiClientProvider({
  value: { queryClient, trpcClient, trpc },
  children,
}: PropsWithChildren<{ value: ApiClient }>) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ApiContext.Provider value={trpc}>{children}</ApiContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
