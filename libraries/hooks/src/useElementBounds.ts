import { useEffect, useRef } from "react";

export function useElementBounds(
  ref: React.RefObject<HTMLElement>,
  onChange: (bounds: DOMRectReadOnly) => void,
) {
  const latestOnChange = useRef(onChange);
  latestOnChange.current = onChange;
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(([bounds]) =>
      latestOnChange.current?.(bounds.contentRect),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
}
