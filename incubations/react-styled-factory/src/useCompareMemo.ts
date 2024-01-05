import { useRef } from "react";

export function useCompareMemo<Input extends Comparable, Output>(
  create: (input: Input) => Output,
  input: Input,
  isEqual: EqualityFn,
): Output {
  const ref = useRef<[Input, Output]>();
  if (!ref.current || !isEqual(ref.current[0], input)) {
    ref.current = [input, create(input)];
  }
  return ref.current[1];
}

export type Comparable = Record<string, unknown> | unknown[] | null | undefined;

export type EqualityFn = <T extends Comparable>(a: T, b: T) => boolean;
