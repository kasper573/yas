import { initGraphQLTada } from "gql.tada";
import type { introspection } from "../graphql.generated";
import type { Scalars } from "./scalars";

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: Scalars;
}>();
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";

export type ID = string | number;
