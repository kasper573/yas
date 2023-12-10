import { useId, type ComponentProps } from "react";
import { styled } from "@yas/style";
import type { FieldProps } from "../form/rcf";
import { Stack } from "../layout/Stack";
import {
  FormControl,
  FormControlErrors,
  FormControlLabel,
} from "../form/FormControl";
import { checkboxRecipe } from "./CheckboxField.css";

export type CheckboxLabelSide = "left" | "right";

export interface CheckboxFieldProps
  extends FieldProps<boolean>,
    Omit<
      ComponentProps<typeof Checkbox>,
      keyof FieldProps<boolean> | "checked" | "as" | "asProps"
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
    <FormControl
      as={Stack}
      asProps={{
        direction: "row",
        reverse: labelSide === "left",
        align: "center",
        gap: 1,
      }}
      {...rest}
    >
      <FormControlLabel htmlFor={id}>{label}</FormControlLabel>
      <Checkbox
        id={id}
        disabled={disabled}
        checked={value ?? false}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <FormControlErrors errors={rest.errors} />
    </FormControl>
  );
}

const Checkbox = styled("input", checkboxRecipe).attrs({
  type: "checkbox",
});
