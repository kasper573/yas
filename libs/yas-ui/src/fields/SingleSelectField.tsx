import type { ReactNode } from "react";
import { useMemo } from "react";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";

export type SingleSelectOption<Value> = {
  value: Value;
  label: ReactNode;
};

export interface SingleSelectFieldProps<Value> extends FieldProps<Value> {
  options: SingleSelectOption<Value>[];
}

export function SingleSelectField<Value>({
  options,
  value,
  onChange,
  required,
  ...rest
}: SingleSelectFieldProps<Value>) {
  const selectedOptionIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value],
  );
  function handleValueChange(indexAsString: string) {
    const selectedOption = options[+indexAsString];
    if (selectedOption) {
      onChange?.(selectedOption.value);
    }
  }
  return (
    <BaseField
      {...rest}
      control={(id) => (
        <select
          id={id}
          value={selectedOptionIndex}
          onChange={(e) => handleValueChange(e.target.value)}
        >
          {!required || (selectedOptionIndex === -1 && <option value={-1} />)}
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
}

function valueOptions<Value>(values: Value[]): SingleSelectOption<Value>[] {
  return values.map((value) => ({ value, label: `${value}` }));
}

SingleSelectField.valueOptions = valueOptions;
