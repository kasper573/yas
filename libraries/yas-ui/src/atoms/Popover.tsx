import * as PopoverPrimitive from "@radix-ui/react-popover";
import { clsx } from "@yas/style";
import { forwardRef } from "react";
import { popoverContent } from "./Popover.css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(function PopoverContent(
  { className, align = "center", sideOffset = 4, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={clsx(popoverContent, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
