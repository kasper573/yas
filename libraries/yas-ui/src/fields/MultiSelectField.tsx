import type { ReactNode } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@yas/icons";
import type { FieldProps } from "../form/rcf";
import {
  SelectTrigger,
  SelectValue,
  SelectTriggerIcon,
  SelectPortal,
  SelectContent,
  SelectScrollUpButton,
  SelectViewport,
  SelectItem,
  SelectScrollDownButton,
} from "./SelectPrimitives";
import { SelectRoot } from "./SelectPrimitives";

export interface MultiSelectOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface MultiSelectFieldProps<Value>
  extends Omit<FieldProps<readonly Value[]>, "value" | "onChange"> {
  value?: Value[];
  onChange?: (value: Value[]) => void;
  options: MultiSelectOption<Value>[];
  emptyOptionText?: ReactNode;
  selectedOptionsSummary?: (options: MultiSelectOption<Value>[]) => ReactNode;
}

export function MultiSelectField<Value>({
  options,
  value,
  onChange,
  required,
  name,
  label = name,
  emptyOptionText,
  errors,
  info,
  isLoading,
  metrics,
  fieldValues,
  selectedOptionsSummary = summarizeOptions,
  ...rootProps
}: MultiSelectFieldProps<Value>) {
  const selectedIndexes = findSelectedIndexes(options, value);

  function toggleItemSelected(index: number) {
    const indexSet = new Set(selectedIndexes);
    if (!indexSet.has(index)) {
      indexSet.add(index);
    } else {
      indexSet.delete(index);
    }
    const newValues = Array.from(indexSet).map((i) => options[i].value);
    return onChange?.(newValues);
  }

  return (
    <SelectRoot
      value={selectedIndexes.length > 0 ? selectedIndexes.join(", ") : ""}
      {...rootProps}
    >
      <SelectTrigger aria-label={typeof label === "string" ? label : undefined}>
        <SelectValue placeholder={emptyOptionText ?? label}>
          {selectedIndexes.length > 0 &&
            selectedOptionsSummary(selectedIndexes.map((i) => options[i]))}
        </SelectValue>
        <SelectTriggerIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            {options.map((option, index) => (
              <SelectItem
                key={index}
                value={index.toString()}
                selected={selectedIndexes.includes(index)}
                // HACK manual event subscription instead of relying on accessible events from radix.
                // This is because radix doesn't support multiselect and only triggers onValueChange for single select value changes.
                onMouseDown={() => toggleItemSelected(index)}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
}

export function summarizeOptions(
  options: MultiSelectOption<unknown>[],
  maxCount: number = 2,
  separator = ", ",
  addAndMoreSuffix = (joined: ReactNode, additional: number) => (
    <>
      {joined}
      {separator} and {additional} more
    </>
  ),
): ReactNode {
  const summary = options.slice(0, maxCount).reduce(
    (before, { label }, index) => (
      <>
        {before}
        {index > 0 && separator}
        {label}
      </>
    ),
    null as ReactNode,
  );

  if (options.length <= maxCount) {
    return summary;
  }

  const additional = options.length - maxCount;
  return addAndMoreSuffix(summary, additional);
}

function findSelectedIndexes<Value>(
  options: MultiSelectOption<Value>[],
  values?: readonly Value[],
): number[] {
  if (!values) {
    return [];
  }
  const indexes: number[] = [];
  for (const value of values) {
    const index = options.findIndex((o) => o.value === value);
    if (index !== -1) {
      indexes.push(index);
    }
  }
  return indexes;
}
