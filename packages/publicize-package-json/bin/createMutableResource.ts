import * as fs from "fs";
import { produce } from "immer";

export function createMutableResource<T>(
  filePath: string,
  parse: (contents: string) => T,
  format: (contents: T) => string,
) {
  const original = load();
  let current = original;

  function update<R>(mutator: (contents: T) => R) {
    let res = undefined as R;
    current = produce(current, (draft) => {
      res = mutator(draft as T);
    });
    fs.writeFileSync(filePath, format(current));
    return res;
  }

  function restore(mutator: (contents: T) => void) {
    fs.writeFileSync(
      filePath,
      format(produce(original, discard(mutator))),
      "utf-8",
    );
  }

  function load() {
    return parse(fs.readFileSync(filePath, "utf-8"));
  }

  function reload() {
    current = load();
  }

  return {
    get contents() {
      return current;
    },
    update,
    restore,
    reload,
  };
}

function discard<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>) => {
    fn(...args);
  };
}
