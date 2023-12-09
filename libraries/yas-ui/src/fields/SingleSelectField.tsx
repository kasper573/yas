import type { ReactNode } from "react";
import { useMemo } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@yas/icons";
import type { FieldProps } from "../form/rcf";
import {
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectScrollUpButton,
  SelectViewport,
  SelectItem,
  SelectScrollDownButton,
  SelectRoot,
  SelectValue,
  SelectTriggerIcon,
} from "./SelectPrimitives";

export type SingleSelectOption<Value> = {
  value: Value;
  label: ReactNode;
};

export interface SingleSelectFieldProps<Value> extends FieldProps<Value> {
  options: SingleSelectOption<Value>[];
  emptyOptionText?: ReactNode;
}

export function SingleSelectField<Value>({
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
  ...rootProps
}: SingleSelectFieldProps<Value>) {
  const selectedOptionIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value],
  );

  function handleValueChange(indexAsString: string) {
    const selectedOption = options[Number(indexAsString)];
    if (selectedOption) {
      onChange?.(selectedOption.value);
    }
  }

  return (
    <SelectRoot
      value={selectedOptionIndex.toString()}
      onValueChange={handleValueChange}
      {...rootProps}
    >
      <SelectTrigger aria-label={typeof label === "string" ? label : undefined}>
        <SelectValue>
          {selectedOptionIndex === -1
            ? emptyOptionText ?? label
            : options[selectedOptionIndex].label}
        </SelectValue>
        <SelectTriggerIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            {!required ||
              (selectedOptionIndex === -1 && (
                <SelectItem value="-1">{emptyOptionText}</SelectItem>
              ))}
            {options.map((option, index) => (
              <SelectItem key={index} value={index.toString()}>
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

function valueOptions<Value>(values: Value[]): SingleSelectOption<Value>[] {
  return values.map((value) => ({ value, label: `${value}` }));
}

SingleSelectField.valueOptions = valueOptions;
