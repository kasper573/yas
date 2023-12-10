import type { ReactNode } from "react";
import { styled } from "@yas/style";
import { Cross2Icon } from "@yas/icons";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";
import { FormControlLabel } from "../form/FormControlLabel";
import { IconButton } from "../atoms/IconButton";

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
  ...rest
}: RadioGroupFieldProps<Value>) {
  return (
    <BaseField
      actions={
        !required &&
        value !== undefined && (
          <IconButton onClick={() => onChange?.(undefined)}>
            <Cross2Icon />
          </IconButton>
        )
      }
      {...rest}
    >
      <RadioGroup>
        {options.map((option, index) => {
          const metric = metrics?.get(option.value);
          const checked = option.value === value;
          const disabled = metric === 0 && !checked;
          return (
            <FormControlLabel
              key={index}
              control={(id) => (
                <Radio
                  id={id}
                  disabled={disabled}
                  checked={checked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange?.(option.value);
                    }
                  }}
                />
              )}
            >
              {option.label}
            </FormControlLabel>
          );
        })}
      </RadioGroup>
    </BaseField>
  );
}

const RadioGroup = styled("fieldset");
const Radio = styled("input").attrs({ type: "radio" });
