import type { Int, Mutation, Query } from "../types";

let counter = 0;

/** @gqlField */
export function count(_: Query): Int {
  return counter;
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
export function increaseCount(_: Mutation, { amount }: { amount: Int }): Int {
  counter += amount;
  return counter;
}
