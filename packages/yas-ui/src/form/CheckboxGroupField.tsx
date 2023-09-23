import { FormHelperText, Checkbox, FormGroup, InputLabel } from "@mui/material";
import type { ReactNode } from "react";
import type { Metrics } from "../api/fakeApiSdk";
import { FormControlLabelWithAdornment } from "../components/FormControlLabelWithAdornment";
import type { FieldProps } from "./rcf";

export interface CheckboxGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface CheckboxGroupFieldProps<Value> extends FieldProps<Value[]> {
  options: CheckboxGroupOption<Value>[];
  metrics?: Metrics<Value>;
}

export function CheckboxGroupField<Value>({
  options,
  name,
  value: checkedValues = [],
  metrics,
  errors = [],
  onChange,
  onBlur,
  onFocus,
  sx,
  size,
}: CheckboxGroupFieldProps<Value>) {
  return (
    <FormGroup sx={sx} onFocus={onFocus} onBlur={onBlur}>
      <InputLabel>{name}</InputLabel>
      {options.map((option, index) => {
        const metric = metrics?.get(option.value);
        const checked = checkedValues.includes(option.value);
        const disabled = metric === 0 && !checked;
        return (
          <FormControlLabelWithAdornment
            key={index}
            disabled={disabled}
            label={option.label}
            adornment={metric}
            control={
              <Checkbox
                value={option.value}
                checked={checked}
                onChange={(e) =>
                  onChange?.(
                    e.target.checked
                      ? checkedValues.concat(option.value)
                      : checkedValues.filter((v) => v !== option.value),
                  )
                }
                size={size}
              />
            }
          />
        );
      })}
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormGroup>
  );
}
