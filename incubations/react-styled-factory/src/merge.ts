export function merge<T extends object>(a?: T, b?: T): T | undefined {
  if (a === b) {
    return a;
  }
  return a && b ? { ...a, ...b } : a ?? b;
}
