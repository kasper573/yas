import type { ComponentType } from "react";

export type AnyProps = Record<string, any>;

export type AnyComponent = ComponentType<any>;

export type Replace<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P];
};

export type MakeOptional<T, K extends PropertyKey> = Omit<T, K> &
  Partial<Pick<T, Extract<keyof T, K>>>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type HasRequiredProps<T> = RequiredKeys<T> extends never ? false : true;

export type OptionalArgIfEmpty<T> = HasRequiredProps<T> extends true
  ? [T]
  : [arg?: T];

export type DictionaryGet<TupleBasedDictionary, Key> =
  TupleBasedDictionary extends [...infer Head, [infer Candidate, infer Value]]
    ? Candidate extends Key
      ? Value
      : DictionaryGet<Head, Key>
    : never;

export type DictionarySet<TupleBasedDictionary, Key, Value> =
  TupleBasedDictionary extends [
    [infer Candidate, infer OldValue],
    ...infer Tail,
  ]
    ? Candidate extends Key
      ? [[Candidate, Value], ...Tail]
      : [[Candidate, OldValue], ...DictionarySet<Tail, Key, Value>]
    : [[Key, Value]];
