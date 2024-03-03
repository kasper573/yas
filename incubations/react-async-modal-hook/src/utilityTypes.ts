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

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalArgIfPartial<T> =
  RequiredKeys<T> extends never ? [arg?: T] : [arg: T];
