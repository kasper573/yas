import { useMemo } from "react";
import type { NavigateOptions } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export function useRouterState<T = inferEncodingValue<typeof stringEncoding>>(
  paramName: string,
  protocol: RouterStateEncoding<T> = stringEncoding as unknown as RouterStateEncoding<T>,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const encodedValue = searchParams.get(paramName) || undefined;

  const value = useMemo(() => {
    try {
      return protocol.decode(encodedValue);
    } catch {
      return protocol.decode(undefined);
    }
  }, [protocol, encodedValue]);

  function setValue(newValue?: T, options: NavigateOptions = {}) {
    const newParams = new URLSearchParams(searchParams);
    if (newValue !== undefined) {
      newParams.set(paramName, protocol.encode(newValue));
    } else {
      newParams.delete(paramName);
    }
    setSearchParams(newParams, { replace: true, ...options });
  }

  return [value, setValue] as const;
}

export type RouterStateEncoding<T> = {
  encode: (value: T) => string;
  decode: (value?: string) => T;
};

type inferEncodingValue<T> = T extends RouterStateEncoding<infer U> ? U : never;

const stringEncoding: RouterStateEncoding<string | undefined> = {
  encode: (value) => value ?? "",
  decode: (value) => value || undefined,
};
