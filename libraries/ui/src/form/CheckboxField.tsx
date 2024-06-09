import { useId, type ComponentProps } from "react";
import { styled } from "@yas/style";
import { Stack } from "../layout/Stack";
import type { FieldProps } from "./shared/types";
import {
  FormControl,
  FormControlError,
  FormControlLabel,
} from "./shared/FormControl";
import { checkbox } from "./CheckboxField.css";

export type CheckboxLabelSide = "left" | "right";

export type CheckboxFieldProps = FieldProps<boolean> &
  Omit<
    ComponentProps<typeof Checkbox>,
    keyof FieldProps<boolean> | "checked"
  > & {
    labelSide?: CheckboxLabelSide;
  };

export function CheckboxField({
  value,
  onChange,
  disabled,
  labelSide = "left",
  label,
  ...rest
}: CheckboxFieldProps) {
  const id = useId();
  return (
    <FormControlStack reverse={labelSide === "left"} {...rest}>
      <FormControlLabel htmlFor={id}>{label}</FormControlLabel>
      <Checkbox
        id={id}
        disabled={disabled}
        checked={value ?? false}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <FormControlError error={rest.error} />
    </FormControlStack>
  );
}

const FormControlStack = FormControl.as(Stack).attrs({
  direction: "row",
  align: "center",
  gap: "s",
});

const Checkbox = styled("input", checkbox).attrs({
  type: "checkbox",
});
