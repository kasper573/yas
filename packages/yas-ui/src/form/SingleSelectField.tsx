import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { ReactNode } from "react";
import { useId, useMemo } from "react";
import type { FieldProps } from "./rcf";

export interface SingleSelectOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface SingleSelectFieldProps<Value> extends FieldProps<Value> {
  options: SingleSelectOption<Value>[];
}

export function SingleSelectField<Value>({
  options,
  name,
  value,
  errors = [],
  onChange,
  fieldValues,
  ...rest
}: SingleSelectFieldProps<Value>) {
  const id = useId();
  const valueAsOptionIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [value, options],
  );
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{name}</InputLabel>
      <Select
        labelId={id}
        value={valueAsOptionIndex !== -1 ? valueAsOptionIndex : ""}
        label={name}
        error={errors.length > 0}
        onChange={(e) => onChange?.(options[e.target.value as number]?.value)}
        {...rest}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
}

function valueOptions<Value>(values: Value[]): SingleSelectOption<Value>[] {
  return values.map((value) => ({ value, label: `${value}` }));
}

SingleSelectField.valueOptions = valueOptions;
