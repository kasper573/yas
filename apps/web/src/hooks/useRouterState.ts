import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useRouterState<T = string>(
  paramName: string,
  protocol: RouterStateEncoding<T> = stringEncoding as unknown as RouterStateEncoding<T>,
): [T, (value?: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const encodedValue = searchParams.get(paramName) || undefined;

  const value = useMemo(() => {
    try {
      return protocol.decode(encodedValue);
    } catch {
      return protocol.decode(undefined);
    }
  }, [protocol, encodedValue]);

  function setValue(newValue?: T) {
    const newParams = new URLSearchParams(searchParams);
    if (newValue !== undefined) {
      newParams.set(paramName, protocol.encode(newValue));
    } else {
      newParams.delete(paramName);
    }
    setSearchParams(newParams);
  }

  return [value, setValue];
}

export type RouterStateEncoding<T> = {
  encode: (value: T) => string;
  decode: (value?: string) => T;
};

const stringEncoding: RouterStateEncoding<string | undefined> = {
  encode: (value) => value ?? "",
  decode: (value) => value || undefined,
};
