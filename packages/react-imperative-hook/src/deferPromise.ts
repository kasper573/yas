export function deferPromise<T = void>() {
  let resolve: (value: T) => void = undefined as never;
  const promise = new Promise<T>((res) => (resolve = res));
  return { promise, resolve };
}
