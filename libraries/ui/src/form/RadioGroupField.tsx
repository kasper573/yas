import { useId, type ReactNode } from "react";
import { Cross2Icon } from "@yas/icons";
import { Button } from "../components/Button";
import { Stack } from "../layout/Stack";
import {
  FormControl,
  FormControlError,
  FormControlLabel,
} from "./shared/FormControl";
import type { FieldProps } from "./shared/types";
import * as styles from "./RadioGroupField.css";

export interface RadioGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export type RadioGroupFieldProps<Value> = FieldProps<Value> & {
  options: RadioGroupOption<Value>[];
};

export function RadioGroupField<Value>({
  options,
  value,
  metrics,
  onChange,
  required,
  error,
  label,
  ...rest
}: RadioGroupFieldProps<Value>) {
  const fieldsetId = useId();
  const showClearButton = value !== undefined && !required;

  function tryEmitChangedValue(newValue: Value | undefined) {
    if (required) {
      if (newValue !== undefined) {
        onChange?.(newValue);
      }
    } else {
      onChange?.(newValue);
    }
  }
  return (
    <FormControl {...rest}>
      <Stack direction="row" align="center" gap="#2">
        <FormControlLabel htmlFor={fieldsetId}>{label}</FormControlLabel>

        <Button
          icon
          size="small"
          onClick={() => tryEmitChangedValue?.(undefined)}
          className={styles.clearButton({ visible: showClearButton })}
        >
          <Cross2Icon />
        </Button>
      </Stack>

      <Fieldset id={fieldsetId}>
        {options.map((option, index) => {
          const radioId = `${fieldsetId}-${index}`;
          const metric = metrics?.[String(option.value)];
          const checked = option.value === value;
          const disabled = metric === 0 && !checked;
          return (
            <Stack key={index} direction="row" reverse align="center" gap="#2">
              <FormControlLabel htmlFor={radioId}>
                {option.label}
                {metric !== undefined && ` (${metric})`}
              </FormControlLabel>
              <input
                type="radio"
                className={styles.radio}
                name={fieldsetId}
                id={radioId}
                disabled={disabled}
                checked={checked}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange?.(option.value);
                  }
                }}
              />
            </Stack>
          );
        })}
      </Fieldset>

      <FormControlError error={error} />
    </FormControl>
  );
}

const Fieldset = Stack.as("fieldset").attrs({
  className: styles.fieldset,
});
