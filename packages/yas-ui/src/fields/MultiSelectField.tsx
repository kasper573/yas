import type { ReactNode } from "react";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";

export interface MultiSelectOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface MultiSelectFieldProps<Value>
  extends Omit<FieldProps<readonly Value[]>, "value" | "onChange"> {
  value?: Value[];
  onChange?: (value: Value[]) => void;
  options: MultiSelectOption<Value>[];
}

export function MultiSelectField<Value>({
  options,
  value,
  onChange,
  required,
  ...rest
}: MultiSelectFieldProps<Value>) {
  const selectedIndexes = valueAsOptionIndexStrings(options, value);
  function handleValueChange(newIndexStrings: string[]) {
    const newValues = newIndexStrings.map((index) => options[+index].value);
    return onChange?.(newValues);
  }

  return (
    <BaseField
      {...rest}
      control={(id) => (
        <select
          required={required}
          multiple
          id={id}
          value={selectedIndexes}
          onChange={(e) =>
            handleValueChange(
              Array.from(e.target.selectedOptions).map((o) => o.value),
            )
          }
        >
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

function valueAsOptionIndexStrings<Value>(
  options: MultiSelectOption<Value>[],
  values?: readonly Value[],
): string[] {
  if (!values) {
    return [];
  }
  const indexes: string[] = [];
  for (const value of values) {
    const index = options.findIndex((o) => o.value === value);
    if (index !== -1) {
      indexes.push(index.toString());
    }
  }
  return indexes;
}
