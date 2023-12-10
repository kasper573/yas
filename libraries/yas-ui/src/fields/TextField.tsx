import { useId, type InputHTMLAttributes } from "react";
import type { RecipeVariants } from "@yas/style";
import { clsx, styled } from "@yas/style";
import type { FieldProps } from "../form/rcf";
import {
  FormControl,
  FormControlErrors,
  FormControlLabel,
  type FormControlProps,
} from "../form/FormControl";
import * as styles from "./TextField.css";

export interface TextFieldProps
  extends FieldProps<string>,
    Pick<FormControlProps, "sx" | "style" | "className">,
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
  name,
  label = name,
  errors,
  ...rest
}: TextFieldProps) {
  const id = useId();
  return (
    <FormControl
      {...rest}
      className={clsx(className, styles.container({ fullWidth }))}
    >
      <FormControlLabel className={styles.label} htmlFor={id}>
        {label}
      </FormControlLabel>
      <Input
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        type={type}
        fullWidth={fullWidth}
        error={!!errors?.length}
        {...inputProps}
      />
      <FormControlErrors errors={errors} />
    </FormControl>
  );
}

const Input = styled("input", styles.inputRecipe);
