import type { HTMLAttributes } from "react";
import { styled } from "@yas/css";
import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";
import { inputRecipe } from "./TextField.css";

export interface TextFieldProps
  extends FieldProps<string>,
    Omit<
      HTMLAttributes<HTMLInputElement>,
      "value" | "onChange" | "onFocus" | "onBlur" | "type"
    > {
  type?: "text" | "number" | "password";
}

export function TextField({
  value,
  onChange,
  onBlur,
  onFocus,
  type,
  ...rest
}: TextFieldProps) {
  return (
    <BaseField
      {...rest}
      control={(id) => (
        <Input
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type}
        />
      )}
    />
  );
}

const Input = styled("input", inputRecipe);
