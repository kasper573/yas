// These utils are useful because design tokens are often mapped in various ways,
// and since typescript poorly maps object keys, we provide these type safe alternatives.

export function mapValues<Input extends object, VOut>(
  obj: Input,
  map: (value: Input[keyof Input], key: keyof Input) => VOut,
): Record<keyof Input, VOut> {
  return toRecord(
    keysOf(obj),
    (key) => key,
    (key) => map(obj[key], key),
  );
}

export function keysOf<T extends object>(input: T): Array<keyof T> {
  return Object.keys(input) as Array<keyof T>;
}

export function keysToRecord<K extends PropertyKey, V>(
  keys: K[],
  createValue: (key: K) => V,
): Record<K, V> {
  return toRecord(keys, (key) => key, createValue);
}

export function toRecord<Item, Key extends PropertyKey, Value>(
  items: Item[],
  createKey: (item: Item) => Key,
  createValue: (item: Item, key: Key) => Value,
): Record<Key, Value> {
  return Object.fromEntries(
    items.map((item) => {
      const key = createKey(item);
      return [key, createValue(item, key)];
    }),
  ) as Record<Key, Value>;
}
