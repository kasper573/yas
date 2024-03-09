/**
 * Convenience utility for producing the useQuery arguments
 * for a query that should only be enabled when the value is defined.
 */

export function enabledWhenDefined<T, Options>(
  value: T | undefined,
  options?: Options,
): [T, { enabled: boolean } & Options] {
  return [
    value as T,
    { ...options, enabled: value !== undefined } as {
      enabled: boolean;
    } & Options,
  ];
}
