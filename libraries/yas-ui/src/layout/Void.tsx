import { useRef, type ComponentProps, useEffect, useCallback } from "react";
import { setElementVars, styled } from "@yas/style";
import { inner, outer, innerHeight, innerWidth } from "./Void.css";

export function Void({ children, ...props }: ComponentProps<typeof Outer>) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useElementBounds(
    innerRef,
    useCallback(({ width, height }) => {
      if (outerRef.current) {
        setElementVars(outerRef.current, {
          [innerWidth]: `${width}px`,
          [innerHeight]: `${height}px`,
        });
      }
    }, []),
  );
  return (
    <Outer ref={outerRef} {...props}>
      <Inner ref={innerRef} axis={props.axis}>
        {children}
      </Inner>
    </Outer>
  );
}

const Outer = styled("div", outer);
const Inner = styled("div", inner);

function useElementBounds(
  ref: { current: null | HTMLElement },
  onChange: (bounds: DOMRect) => void,
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current;
    const obs = new ResizeObserver(() => onChange(el.getBoundingClientRect()));
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, onChange]);
}
