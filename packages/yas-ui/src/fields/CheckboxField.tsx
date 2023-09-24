import type { ComponentProps } from "react";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";
import { styled } from "../styling/css";
import { checkboxRecipe } from "./CheckboxField.css";

export interface CheckboxFieldProps
  extends FieldProps<boolean>,
    Omit<
      ComponentProps<typeof Checkbox>,
      keyof FieldProps<boolean> | "checked"
    > {}

export function CheckboxField({
  value,
  onChange,
  disabled,
  ...rest
}: CheckboxFieldProps) {
  return (
    <BaseField
      {...rest}
      control={(id) => (
        <Checkbox
          id={id}
          disabled={disabled}
          checked={value ?? false}
          onChange={(e) => onChange?.(e.target.checked)}
        />
      )}
    />
  );
}

const Checkbox = styled("input", checkboxRecipe, { role: "checkbox" });
