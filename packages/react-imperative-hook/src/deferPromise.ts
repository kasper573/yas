export function deferPromise<T = void>(): Deferred<T> {
  let resolve: (value: T) => void;
  function deferred(resolution: T) {
    resolve(resolution);
  }
  deferred.promise = new Promise<T>((res) => (resolve = res));
  return deferred;
}

export interface Deferred<T> {
  (resolution: T): void;
  readonly promise: Promise<T>;
}
