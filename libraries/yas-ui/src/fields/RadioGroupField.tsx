import { useId, type ReactNode } from "react";
import { Cross2Icon } from "@yas/icons";
import type { FieldProps } from "../form/rcf";
import {
  FormControl,
  FormControlErrors,
  FormControlLabel,
} from "../form/FormControl";
import { IconButton } from "../atoms/IconButton";
import { Stack } from "../layout/Stack";
import { Void } from "../layout/Void";
import * as styles from "./RadioGroupField.css";

export interface RadioGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface RadioGroupFieldProps<Value> extends FieldProps<Value> {
  options: RadioGroupOption<Value>[];
}

export function RadioGroupField<Value>({
  options,
  value,
  metrics,
  onChange,
  required,
  errors,
  name,
  label = name,
  fieldValues,
  ...rest
}: RadioGroupFieldProps<Value>) {
  const fieldsetId = useId();
  const showClearButton = value !== undefined && !required;
  return (
    <FormControl {...rest}>
      <Stack direction="row" align="center" gap="#2">
        <FormControlLabel htmlFor={fieldsetId}>{label}</FormControlLabel>

        <Void>
          <IconButton
            size="small"
            onClick={() => onChange?.(undefined)}
            className={styles.clearButton({ visible: showClearButton })}
          >
            <Cross2Icon />
          </IconButton>
        </Void>
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

      <FormControlErrors errors={errors} />
    </FormControl>
  );
}

const Fieldset = Stack.as("fieldset").attrs({
  className: styles.fieldset,
});
