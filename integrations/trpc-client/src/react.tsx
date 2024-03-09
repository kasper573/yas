import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import transformer from "superjson";
import type { ApiRouter } from "@yas/trpc-server";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { err, unwrapUnsafe_useWithCaution } from "@yas/result";
import { useQueryClient } from "@yas/query";
export type { types } from "@yas/trpc-server";

/**
 * Convenience proxy for accessing the client interface
 * of the API without having to call useContext first.
 */
export const api = new Proxy({} as TrpcClient["react"], {
  get: function useApi(_, key) {
    const trpc = useContext(TrpcReactContext);
    return trpc[key as keyof TrpcClient["react"]];
  },
});

const TrpcReactContext = createContext<TrpcClient["react"]>(
  new Proxy({} as TrpcClient["react"], {
    get() {
      // Using unsafe unwrap to panic early to clearly indicate that context is misconfigured
      unwrapUnsafe_useWithCaution(
        err(
          new Error(
            "You must wrap components using the trpc api with a TrpcProvider",
          ),
        ),
      );
    },
  }),
);

export function TrpcClientProvider({
  value: { react, trpc },
  children,
}: PropsWithChildren<{ value: TrpcClient }>) {
  const queryClient = useQueryClient();
  return (
    <TrpcReactContext.Provider value={react}>
      <react.Provider client={trpc} queryClient={queryClient}>
        {children}
      </react.Provider>
    </TrpcReactContext.Provider>
  );
}

export type TrpcClient = ReturnType<typeof createTrpcClient>;
export function createTrpcClient(url: string) {
  const react = createTRPCReact<ApiRouter>();
  const trpc = react.createClient({
    links: [httpBatchLink({ url, transformer })],
  });
  return { react, trpc };
}
