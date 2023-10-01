import type { ReactNode } from "react";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";
import { CheckboxField } from "./CheckboxField";

export interface CheckboxGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface CheckboxGroupFieldProps<Value> extends FieldProps<Value[]> {
  options: CheckboxGroupOption<Value>[];
}

export function CheckboxGroupField<Value>({
  options,
  value: checkedValues = [],
  metrics,
  onChange,
  ...rest
}: CheckboxGroupFieldProps<Value>) {
  return (
    <BaseField {...rest}>
      {options.map((option, index) => {
        const metric = metrics?.get(option.value);
        const checked = checkedValues.includes(option.value);
        const disabled = metric === 0 && !checked;
        return (
          <CheckboxField
            key={index}
            disabled={disabled}
            label={option.label}
            value={checked}
            onChange={(newChecked) =>
              onChange?.(
                newChecked
                  ? checkedValues.concat(option.value)
                  : checkedValues.filter((v) => v !== option.value),
              )
            }
          />
        );
      })}
    </BaseField>
  );
}
