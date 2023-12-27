import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useRouterState<T>(
  paramName: string,
  protocol: {
    encode: (value: T) => string;
    decode: (value?: string) => T;
  },
): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const encodedValue = searchParams.get(paramName) || undefined;

  const value = useMemo(() => {
    try {
      return protocol.decode(encodedValue);
    } catch {
      return protocol.decode(undefined);
    }
  }, [protocol, encodedValue]);

  function setValue(newValue: T) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramName, protocol.encode(newValue));
    setSearchParams(newParams);
  }

  return [value, setValue];
}
