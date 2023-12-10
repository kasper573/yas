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
  className: styles.label,
});

export const SelectViewport = styled(Select.Viewport).attrs({
  className: styles.viewport,
});

export const SelectContent = styled(Select.Content).attrs({
  className: styles.content,
});

export const SelectScrollDownButton = styled(Select.ScrollDownButton).attrs({
  className: styles.scrollButton,
  children: <ChevronUpIcon />,
});

export const SelectScrollUpButton = styled(Select.ScrollUpButton).attrs({
  className: styles.scrollButton,
  children: <ChevronDownIcon />,
});

export const SelectTrigger = styled(Select.Trigger).attrs({
  className: styles.trigger,
});

export const SelectTriggerIcon = styled(Select.Icon).attrs({
  className: styles.triggerIcon,
  children: <ChevronDownIcon />,
});

export const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Select.Item> & { selected?: boolean }
>(function SelectItem({ children, className, selected, ...props }, ref) {
  // Radix select doesn't support multiselect,
  // so we have to force enable aria attributes to support multiple selected items
  let focedAriaProps: undefined | Record<string, unknown> = undefined;
  if (selected !== undefined) {
    focedAriaProps = {
      "data-selected": selected,
      "data-state": selected ? "checked" : "unchecked",
    };
  }

  return (
    <Select.Item className={clsx(styles.item, className)} {...props} ref={ref}>
      <Select.ItemText>{children}</Select.ItemText>
      <CheckIcon className={styles.itemSelectedIndicator({ selected })} />
    </Select.Item>
  );
});
