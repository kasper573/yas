import type { Scalars } from "@yas/graphql-server";

export type { Scalars } from "@yas/graphql-server";

type ScalarResolvers = {
  [K in keyof Scalars]: (value: unknown) => Scalars[K];
};

export const scalars: ScalarResolvers = {
  GqlDate: (value) =>
    new Date(typeof value === "number" ? value : String(value)),
};
