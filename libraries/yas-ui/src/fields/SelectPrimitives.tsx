import * as Select from "@radix-ui/react-select";
import { clsx, styled } from "@yas/style";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@yas/icons";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { dividerRecipe } from "../layout/Divider.css";
import * as styles from "./SelectPrimitives.css";

export const SelectRoot = styled(Select.Root);
export const SelectPortal = styled(Select.Portal);
export const SelectGroup = styled(Select.Group);
export const SelectValue = styled(Select.Value);

export const SelectDivider = styled(Select.Separator).attrs({
  className: dividerRecipe(),
});

export const SelectLabel = styled(Select.Label).attrs({
  className: styles.selectLabel,
});

export const SelectViewport = styled(Select.Viewport).attrs({
  className: styles.selectViewport,
});

export const SelectContent = styled(Select.Content).attrs({
  className: styles.selectContent,
});

export const SelectScrollDownButton = styled(Select.ScrollDownButton).attrs({
  className: styles.selectScrollButton,
  children: <ChevronUpIcon />,
});

export const SelectScrollUpButton = styled(Select.ScrollUpButton).attrs({
  className: styles.selectScrollButton,
  children: <ChevronDownIcon />,
});

export const SelectTrigger = styled(Select.Trigger).attrs({
  className: styles.selectTrigger,
});

export const SelectIcon = styled(Select.Icon).attrs({
  className: styles.selectIcon,
  children: <ChevronDownIcon />,
});

export const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Select.Item>
>(function SelectItem({ children, className, ...props }, ref) {
  return (
    <Select.Item
      className={clsx(styles.selectItem, className)}
      {...props}
      ref={ref}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className={styles.selectItemIndicator}>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});
