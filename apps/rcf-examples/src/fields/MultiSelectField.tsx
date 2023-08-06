import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { ReactNode } from "react";
import { useId, useMemo } from "react";
import type { FieldProps } from "../rcf";

export interface SelectOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface MultiSelectFieldProps<Value>
  extends Omit<FieldProps<readonly Value[]>, "value" | "onChange"> {
  value?: Value[];
  onChange?: (value: Value[]) => void;
  options: SelectOption<Value>[];
}

export function MultiSelectField<Value>({
  options,
  name,
  value,
  errors = [],
  onChange,
  ...rest
}: MultiSelectFieldProps<Value>) {
  const id = useId();
  const valueIndexes = useMemo(
    () => valueAsOptionIndexes(options, value),
    [value, options],
  );
  function optionValuesForIndexes(indexes: number[]) {
    return indexes.map((index) => options[index].value);
  }
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{name}</InputLabel>
      <Select
        multiple
        labelId={id}
        value={valueIndexes}
        label={name}
        error={errors.length > 0}
        onChange={(e) =>
          onChange?.(optionValuesForIndexes(e.target.value as number[]))
        }
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

function valueAsOptionIndexes<Value>(
  options: SelectOption<Value>[],
  values?: readonly Value[],
) {
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

export function valueOptions<Value>(values: Value[]): SelectOption<Value>[] {
  return values.map((value) => ({ value, label: `${value}` }));
}
