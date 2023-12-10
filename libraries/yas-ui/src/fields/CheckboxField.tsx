import type { ComponentProps } from "react";
import { styled } from "@yas/style";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";
import { Stack } from "../layout/Stack";
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
  ...rest
}: CheckboxFieldProps) {
  return (
    <BaseField
      as={Stack}
      asProps={{
        direction: "row",
        reverse: labelSide === "left",
        align: "center",
        gap: 1,
      }}
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

const Checkbox = styled("input", checkboxRecipe).attrs({
  type: "checkbox",
});
