import type { ComponentPropsWithoutRef, ElementRef, ElementType } from "react";
import { forwardRef } from "react";
import { theme } from "../stitches";
import { Flex } from "./Flex";

export interface StackProps extends ComponentPropsWithoutRef<typeof Flex> {
  gap?: keyof typeof theme.space;
  as?: ElementType;
}

export const Stack = forwardRef<ElementRef<typeof Flex>, StackProps>(
  ({ gap = "1", css, ...props }, ref) => (
    <Flex
      {...props}
      css={{ gap: gap !== undefined ? theme.space[gap] : undefined, ...css }}
      ref={ref}
    />
  )
);
