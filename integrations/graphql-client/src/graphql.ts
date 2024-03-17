import { initGraphQLTada } from "gql.tada";
import type { Scalars } from "@yas/graphql-server";
import type { introspection } from "../graphql.generated.d.ts";

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: Scalars;
}>();
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";

export type ID = string | number;
