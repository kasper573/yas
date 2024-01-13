import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number): T {
  return useDebounce(value, delay).value;
}

export function useDebounce<T>(value: T, delay: number) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);
    return () => {
      setIsDebouncing(false);
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { value: debouncedValue, isDebouncing };
}
