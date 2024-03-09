import type { TadaDocumentNode } from "gql.tada";
import { Client, fetchExchange } from "urql";

export type GraphQLDocumentNode<Data, Variables> = TadaDocumentNode<
  Data,
  Variables
>;

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
    exchanges: [fetchExchange],
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
