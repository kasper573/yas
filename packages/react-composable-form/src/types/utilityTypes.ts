import type { ComponentType } from "react";

export type AnyProps = Record<string, any>;

export type AnyComponent = ComponentType<any>;

export type MakeOptional<T, K extends PropertyKey> = Omit<T, K> &
  Partial<Pick<T, Extract<keyof T, K>>>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type AllKeysInUnion<T> = T extends any ? keyof T : never;

export type HasRequiredProps<T> = RequiredKeys<T> extends never ? false : true;

export type OptionalArgIfEmpty<T> = HasRequiredProps<T> extends true
  ? [T]
  : [arg?: T];

export type DictionaryGet<TupleBasedDictionary, SearchKey> =
  TupleBasedDictionary extends [...infer Head, [infer Key, infer Value]]
    ? SearchKey extends Key
      ? Value
      : DictionaryGet<Head, SearchKey>
    : never;

export type DictionarySet<TupleBasedDictionary, SearchKey, NewValue> =
  TupleBasedDictionary extends [[infer Key, infer OldValue], ...infer Tail]
    ? Equal<Key, SearchKey> extends true
      ? [[Key, NewValue], ...Tail]
      : [[Key, OldValue], ...DictionarySet<Tail, SearchKey, NewValue>]
    : [[SearchKey, NewValue]];

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;
