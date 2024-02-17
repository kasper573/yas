import { useRef, type ComponentProps } from "react";
import { setElementVars, styled } from "@yas/style";
import { useElementBounds } from "@yas/hooks";
import { inner, outer, innerHeight, innerWidth } from "./Void.css";

/**
 * Renders its children in place without affecting the surrounding layout.
 */
export function Void({ children, ...props }: ComponentProps<typeof Outer>) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useElementBounds(innerRef, ({ width, height }) => {
    if (outerRef.current) {
      setElementVars(outerRef.current, {
        [innerWidth]: `${width}px`,
        [innerHeight]: `${height}px`,
      });
    }
  });
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
