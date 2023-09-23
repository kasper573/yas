import {
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import type { ReactNode } from "react";
import { useId, useMemo } from "react";
import { Delete } from "@mui/icons-material";
import type { Metrics } from "../api/fakeApiSdk";
import { FormControlLabelWithAdornment } from "../components/FormControlLabelWithAdornment";
import { FormLabelWithActions } from "../components/FormLabelWithActions";
import type { FieldProps } from "./rcf";

export interface RadioGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface RadioGroupFieldProps<Value> extends FieldProps<Value> {
  options: RadioGroupOption<Value>[];
  isLoading?: boolean;
  metrics?: Metrics<Value>;
}

export function RadioGroupField<Value>({
  options,
  name,
  value,
  errors = [],
  metrics,
  onChange,
  isLoading,
  required,
  sx,
  size,
  fieldValues,
  ...rest
}: RadioGroupFieldProps<Value>) {
  const id = useId();
  const valueAsOptionIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [value, options],
  );
  return (
    <FormControl fullWidth error={errors.length > 0} sx={sx}>
      <FormLabelWithActions
        id={id}
        actions={
          !required && (
            <IconButton
              onClick={() => onChange?.(undefined)}
              size={size}
              edge="end"
            >
              <Delete />
            </IconButton>
          )
        }
      >
        {name}
      </FormLabelWithActions>
      <RadioGroup
        value={valueAsOptionIndex !== -1 ? valueAsOptionIndex : ""}
        onChange={(e) =>
          onChange?.(options[e.target.value as unknown as number]?.value)
        }
        aria-labelledby={id}
        name={name}
        {...rest}
      >
        {options.map((option, index) => {
          const metric = metrics?.get(option.value);
          const selected = valueAsOptionIndex === index;
          const disabled = metric === 0 && !selected;
          return (
            <FormControlLabelWithAdornment
              key={index}
              disabled={disabled}
              control={<Radio size={size} disabled={isLoading} />}
              label={option.label}
              adornment={metric}
              size={size}
              value={index}
            />
          );
        })}
      </RadioGroup>
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
}

const sizeFontVariants = {
  small: "body2",
  medium: "body1",
} as const;
