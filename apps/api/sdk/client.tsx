import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import type { ApiRouter } from "../src/router";
import { ApiContext } from "./index";

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
