import { useEffect, useRef } from "react";

export function useConsoleFilter(
  allowInvocation: (...args: unknown[]) => boolean,
) {
  const latest = useRef(allowInvocation);
  latest.current = allowInvocation;
  useEffect(() => monkeyPatchConsole(latest.current), []);
}

function monkeyPatchConsole(allowInvocation: (...args: unknown[]) => boolean) {
  const { warn, log, error } = console;
  const originalFunctions = { warn, log, error };
  const functionNames = Object.keys(originalFunctions) as Array<
    keyof typeof originalFunctions
  >;

  function restoreOriginalFunctions() {
    for (const functionName of functionNames) {
      console[functionName] = originalFunctions[functionName];
    }
  }

  for (const functionName of functionNames) {
    console[functionName] = function filteredFn(...args: unknown[]) {
      if (allowInvocation(...args)) {
        originalFunctions[functionName](...args);
      }
    };
  }

  return restoreOriginalFunctions;
}
