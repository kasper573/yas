import {
  FormHelperText,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputLabel,
} from "@mui/material";
import type { ReactNode } from "react";
import type { FieldProps } from "../rcf";

export interface CheckboxGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface CheckboxGroupFieldProps<Value> extends FieldProps<Value[]> {
  options: CheckboxGroupOption<Value>[];
}

export function CheckboxGroupField<Value>({
  options,
  name,
  value: checkedValues = [],
  errors = [],
  onChange,
  onBlur,
  onFocus,
  sx,
  size,
}: CheckboxGroupFieldProps<Value>) {
  return (
    <FormGroup sx={sx}>
      <InputLabel>{name}</InputLabel>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          label={option.label}
          onFocus={onFocus}
          onBlur={onBlur}
          control={
            <Checkbox
              value={option.value}
              checked={checkedValues.includes(option.value)}
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
      ))}
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormGroup>
  );
}
