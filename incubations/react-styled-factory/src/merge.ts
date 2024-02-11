export function merge<T>(a?: T, b?: T): T | undefined {
  if (a === b) {
    return a;
  }
  return a && b ? { ...a, ...b } : a ?? b;
}
