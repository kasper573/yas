import type { TadaDocumentNode } from "gql.tada";
import { Client, fetchExchange } from "urql";
import type { GraphQLServerHeaders } from "@yas/graphql-server";
import scalarsExchange from "urql-custom-scalars-exchange";
import { getIntrospectedSchema } from "@urql/introspection";
import schemaGQLString from "@yas/graphql-server/schema.generated.graphql?raw";
import { scalars } from "./scalars";

export type GraphQLDocumentNode<Data, Variables> = TadaDocumentNode<
  Data,
  Variables
>;

export type GraphQLClient = ReturnType<typeof createGraphQLClient>;

export function createGraphQLClient({
  url,
  headers,
}: {
  url: string;
  headers: () => GraphQLServerHeaders;
}) {
  const schema = getIntrospectedSchema(schemaGQLString);
  return new Client({
    url,
    exchanges: [scalarsExchange({ schema, scalars }), fetchExchange],
    fetchOptions: () => ({
      method: "POST",
      headers: headers() as unknown as HeadersInit,
      mode: "cors",
    }),
  });
}
