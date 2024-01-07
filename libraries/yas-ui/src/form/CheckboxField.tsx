import { useId, type ComponentProps } from "react";
import { styled } from "@yas/style";
import { Stack } from "../layout/Stack";
import type { FieldProps } from "./rcf";
import {
  FormControl,
  FormControlErrors,
  FormControlLabel,
} from "./FormControl";
import { checkboxRecipe } from "./CheckboxField.css";

export type CheckboxLabelSide = "left" | "right";

export interface CheckboxFieldProps
  extends FieldProps<boolean>,
    Omit<
      ComponentProps<typeof Checkbox>,
      keyof FieldProps<boolean> | "checked"
    > {
  labelSide?: CheckboxLabelSide;
}

export function CheckboxField({
  value,
  onChange,
  disabled,
  labelSide = "left",
  name,
  label = name,
  fieldValues,
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
      <FormControlErrors errors={rest.errors} />
    </FormControlStack>
  );
}

const FormControlStack = FormControl.as(Stack).attrs({
  direction: "row",
  align: "center",
  gap: "#1",
});

const Checkbox = styled("input", checkboxRecipe).attrs({
  type: "checkbox",
});
