import { Client, cacheExchange, fetchExchange } from "urql";

export type GraphQLClient = ReturnType<typeof createGraphQLClient>;

export function createGraphQLClient({
  url,
  token: getToken,
}: {
  url: string;
  token?: () => string | undefined;
}) {
  return new Client({
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
}
