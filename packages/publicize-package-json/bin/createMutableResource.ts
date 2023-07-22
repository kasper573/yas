import * as fs from "fs";
import { produce } from "immer";

export function createMutableResource<T>(
  filePath: string,
  parse: (contents: string) => T,
  format: (contents: T) => string,
) {
  const original = load();
  let current = original;

  function update(mutator: (contents: T) => void) {
    current = produce(current, discard(mutator));
    fs.writeFileSync(filePath, format(current));
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function discard<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>) => {
    fn(...args);
  };
}
