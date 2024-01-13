import type { ComponentProps, ReactNode } from "react";
import { useRef, useState } from "react";
import { styled } from "@yas/style";
import { useElementBounds } from "@yas/hooks";
import { relativeFill } from "./Bounds.css";
import { Dock } from "./Dock";

export interface BoundsProps
  extends Omit<ComponentProps<typeof Root>, "children"> {
  children?: (bounds: DOMRectReadOnly) => ReactNode;
}

/**
 * Fills the parent element and starts observing its size.
 * When the size changes, the children are rendered with the new size provided as an argument.
 * (The children are absolute positioned and docked to the parent to avoid impacting the parent's size)
 */
export function Bounds({ children, ...props }: BoundsProps) {
  const [bounds, setBounds] = useState<DOMRectReadOnly>();
  const ref = useRef<HTMLDivElement>(null);
  useElementBounds(ref, setBounds);
  return (
    <Root ref={ref} {...props}>
      <Dock>{bounds ? children?.(bounds) : null}</Dock>
    </Root>
  );
}

const Root = styled("div", relativeFill);
