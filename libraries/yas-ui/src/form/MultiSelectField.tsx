import { useId, type ReactNode } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@yas/icons";
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
} from "../components/Select";
import { SelectRoot } from "../components/Select";
import type { FieldProps } from "./shared/rcf";
import {
  FormControl,
  FormControlLabel,
  FormControlErrors,
} from "./shared/FormControl";

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
  emptyOptionText = "Select something...",
  selectedOptionsSummary = summarizeOptions,
  errors,
  name,
  label = name,
  fieldValues,
  ...rest
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

  const id = useId();
  return (
    <FormControl {...rest}>
      <FormControlLabel htmlFor={id}>{label}</FormControlLabel>

      <SelectRoot
        value={selectedIndexes.length > 0 ? selectedIndexes.join(", ") : ""}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={emptyOptionText}>
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

      <FormControlErrors errors={errors} />
    </FormControl>
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
