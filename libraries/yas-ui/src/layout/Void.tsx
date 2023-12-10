import type { ComponentProps } from "react";
import { styled } from "@yas/style";
import { inner, outer } from "./Void.css";

export function Void({ children, ...props }: ComponentProps<typeof Outer>) {
  return (
    <Outer {...props}>
      <Inner axis={props.axis}>{children}</Inner>
    </Outer>
  );
}

const Outer = styled("div", outer);
const Inner = styled("div", inner);
