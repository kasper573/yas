// Common types used by all modules. Do not put business logic here.

export type Context = {
  clientId: string;
};

export interface Headers {
  "client-id": string;
}

/**
 * @gqlType
 */
export type Query = unknown;

/**
 * @gqlType
 */
export type Mutation = unknown;

export type { ID, Float, Int } from "grats";
