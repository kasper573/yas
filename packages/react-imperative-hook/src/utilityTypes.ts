import type { ComponentType } from "react";

export type AnyComponent = ComponentType<any>;

export type Merge<T> = {
  [K in keyof T]: T[K];
};

export type PartialByKeys<T, K extends PropertyKey> = Merge<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

export type ExtractRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]-?: T[K];
};

export type MakeOptionalIfEmptyObject<T> = ExtractRequired<T> extends Record<
  string,
  never
>
  ? void | undefined | T
  : T;
