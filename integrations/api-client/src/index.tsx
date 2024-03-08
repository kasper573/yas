import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { QueryClientConfig } from "@yas/query";
import { QueryClient, QueryClientProvider } from "@yas/query";
import type { PropsWithChildren } from "react";
import transformer from "superjson";
import type { ApiRouter } from "@yas/api";
import { createContext, useContext } from "react";
import { err, unwrapUnsafe_useWithCaution } from "@yas/result";
export type { types } from "@yas/api";

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

export function createApiClient(
  url: string,
  defaultOptions?: QueryClientConfig["defaultOptions"],
) {
  const queryClient = new QueryClient({ defaultOptions });
  const trpc = createTRPCReact<ApiRouter>();
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url, transformer })],
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

/**
 * Convenience utility for producing the useQuery arguments
 * for a query that should only be enabled when the value is defined.
 */
export function enabledWhenDefined<T, Options>(
  value: T | undefined,
  options?: Options,
): [T, { enabled: boolean } & Options] {
  return [
    value as T,
    { ...options, enabled: value !== undefined } as {
      enabled: boolean;
    } & Options,
  ];
}
