import * as fs from "fs";
import { produce } from "immer";

export function createMutableResource<T>(
  filePath: string,
  parse: (contents: string) => T,
  format: (contents: T, operation: "update" | "restore") => string,
) {
  const original = load();
  let current = original;

  function mutate<R>(
    mutator: (contents: T) => R,
    operation: "update" | "restore",
  ): R {
    let res = undefined as R;
    current = produce(current, (draft) => {
      res = mutator(draft as T);
    });
    fs.writeFileSync(filePath, format(current, operation), "utf-8");
    return res;
  }

  function update<R>(mutator: (contents: T) => R): R {
    return mutate(mutator, "update");
  }

  function restore<R>(mutator: (contents: T) => R): R {
    return mutate(mutator, "restore");
  }

  function load() {
    return parse(fs.readFileSync(filePath, "utf-8"));
  }

  function reload() {
    current = load();
  }

  return Object.freeze({
    get contents() {
      return current;
    },
    update,
    restore,
    reload,
    filePath,
  });
}

export type MutableResource<T> = ReturnType<typeof createMutableResource<T>>;
