// Common types used by all modules. Do not put business logic here.
// This file is also exposed as the public interface of the package and should therefore only export types.

import type { ID } from "grats";

/**
 * @gqlType
 */
export type Query = unknown;

/**
 * @gqlType
 */
export type Mutation = unknown;

export type * from "./scalars";

export type { GraphQLServerContext as Context } from "./context";

export interface GraphQLServerHeaders {
  "client-id": ID;
}
