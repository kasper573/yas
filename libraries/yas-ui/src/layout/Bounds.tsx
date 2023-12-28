import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { styled } from "@yas/style";
import { relativeFill } from "./Bounds.css";
import { Dock } from "./Dock";

export interface BoundsProps
  extends Omit<ComponentProps<typeof Root>, "children"> {
  children?: (bounds: DOMRectReadOnly) => ReactNode;
}

export function Bounds({ children, ...props }: BoundsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useElementBounds(ref);
  return (
    <Root ref={ref} {...props}>
      <Dock>{bounds ? children?.(bounds) : null}</Dock>
    </Root>
  );
}

const Root = styled("div", relativeFill);

function useElementBounds(ref: React.RefObject<HTMLElement>) {
  const [bounds, setBounds] = useState<DOMRectReadOnly>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(([bounds]) =>
      setBounds(bounds.contentRect),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return bounds;
}
