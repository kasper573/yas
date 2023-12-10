import { useId, type ReactNode } from "react";
import type { FieldProps } from "../form/rcf";
import {
  FormControl,
  FormControlErrors,
  FormControlLabel,
} from "../form/FormControl";
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
  errors,
  name,
  label = name,
  fieldValues,
  ...rest
}: CheckboxGroupFieldProps<Value>) {
  const id = useId();
  return (
    <FormControl {...rest}>
      <FormControlLabel htmlFor={id}>{label}</FormControlLabel>

      {options.map((option, index) => {
        const metric = metrics?.[String(option.value)];
        const checked = checkedValues.includes(option.value);
        const disabled = metric === 0 && !checked;
        return (
          <CheckboxField
            key={index}
            disabled={disabled}
            label={
              <>
                {option.label}
                {metric !== undefined && ` (${metric})`}
              </>
            }
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

      <FormControlErrors errors={errors} />
    </FormControl>
  );
}
