import type { InputHTMLAttributes } from "react";
import type { RecipeVariants } from "@yas/style";
import { clsx, styled } from "@yas/style";
import type { FieldProps } from "../form/rcf";
import type { BaseFieldProps } from "../form/BaseField";
import { BaseField } from "../form/BaseField";
import * as styles from "./TextField.css";

export interface TextFieldProps
  extends FieldProps<string>,
    Pick<BaseFieldProps, "sx" | "style" | "className">,
    RecipeVariants<typeof styles.container> {
  type?: "text" | "number" | "password";
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "onFocus" | "onBlur" | "type"
  >;
}

export function TextField({
  value,
  onChange,
  type,
  inputProps,
  fullWidth,
  className,
  ...baseFieldProps
}: TextFieldProps) {
  return (
    <BaseField
      {...baseFieldProps}
      className={clsx(className, styles.container({ fullWidth }))}
      labelProps={{ className: styles.label }}
      control={(id) => (
        <Input
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          type={type}
          fullWidth={fullWidth}
          error={!!baseFieldProps.errors?.length}
          {...inputProps}
        />
      )}
    />
  );
}

const Input = styled("input", styles.inputRecipe);
