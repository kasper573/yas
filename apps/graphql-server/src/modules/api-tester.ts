import type { Context, Int, Mutation, Query } from "../types";

const countsPerClient = new Map<string, number>();

/** @gqlField */
export function count(_: Query, args: unknown, { clientId }: Context): Int {
  return countsPerClient.get(clientId) ?? 0;
}

/** @gqlField */
export function error(_: Query): Int {
  throw new Error("This is a server side error");
}

/** @gqlField */
export function greeting(_: Query, { name }: { name: string }): string {
  return name.trim() ? `Hello, ${name}!` : "";
}

/** @gqlField */
export function increaseCount(
  _: Mutation,
  { amount }: { amount: Int },
  { clientId }: Context,
): Int {
  let count = countsPerClient.get(clientId) ?? 0;
  count += amount;
  countsPerClient.set(clientId, count);
  return count;
}
