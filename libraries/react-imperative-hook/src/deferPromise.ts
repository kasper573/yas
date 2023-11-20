export function deferPromise<T = void>(): Deferred<T> {
  let resolve: (value: T) => void;
  function deferred(resolution: T) {
    resolve(resolution);
  }
  deferred.promise = new Promise<T>((res) => (resolve = res));
  return deferred as unknown as Deferred<T>;
}

export type Deferred<T> = {
  readonly promise: Promise<T>;
} & (IsVoidOnly<T> extends true ? () => void : (resolution: T) => void);

type IsVoidOnly<T> = Exclude<T, void> extends never ? true : false;
