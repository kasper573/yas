export function flattened<Values extends Record<string, unknown>>(
  values: Values,
): Flattened<Values> {
  const flattened = {} as Flattened<Values>;
  flattenImpl(values, flattened);
  return flattened;
}

function flattenImpl(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  prefix = "",
): void {
  for (const [key, value] of Object.entries(source)) {
    const path = prefix + key;
    if (isPlainObject(value)) {
      flattenImpl(value, target, path + separator);
    } else {
      target[path] = value;
    }
  }
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && !Array.isArray(value) && typeof value === "object";

const separator = "." as const;

export type Flattened<T> = {
  [K in Path<T> as `${IsLeaf<T, K> extends true
    ? `${string & K}`
    : never}`]: PathValue<T, K>;
};

type IsLeaf<O, K> = Extract<
  Exclude<Path<O>, K>,
  `${K & string}${typeof separator}${string}`
> extends never
  ? true
  : false;

type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof never[]>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof never[]> & string}`
    : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;
