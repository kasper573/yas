import type { QueryClientConfig } from "@yas/query";
import { QueryClient } from "@yas/query";
import { Client, cacheExchange, fetchExchange } from "urql";

export type GraphQLClient = ReturnType<typeof createGraphQLClient>;

export function createGraphQLClient({
  url,
  token: getToken,
  queryClientOptions,
}: {
  url: string;
  token?: () => string | undefined;
  queryClientOptions?: QueryClientConfig["defaultOptions"];
}) {
  const urqlClient = new Client({
    url,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const token = getToken?.();
      return {
        method: "POST",
        headers: { authorization: token ? `Bearer ${token}` : "" },
        mode: "cors",
      };
    },
  });
  const queryClient = new QueryClient({ defaultOptions: queryClientOptions });
  return { urqlClient, queryClient };
}
