import type { ComponentProps } from "react";
import { useId } from "react";
import type { RecipeVariants } from "@yas/style";
import { clsx, styled } from "@yas/style";
import type { FieldProps } from "./rcf";
import {
  FormControl,
  FormControlErrors,
  FormControlLabel,
  type FormControlProps,
} from "./FormControl";
import * as styles from "./TextField.css";

export interface TextFieldProps
  extends FieldProps<string>,
    Pick<FormControlProps, "sx" | "style" | "className">,
    RecipeVariants<typeof styles.container> {
  type?: "text" | "number" | "password";
  inputProps?: Omit<
    ComponentProps<typeof Input>,
    "value" | "onChange" | "onFocus" | "onBlur" | "type" | "size"
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
  fieldValues,
  required,
  size,
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
        onChange={(e) => {
          if (!required && e.target.value === "") {
            onChange?.(undefined);
          } else {
            onChange?.(e.target.value);
          }
        }}
        type={type}
        fullWidth={fullWidth}
        error={!!errors?.length}
        autoComplete="off"
        size={size}
        required={required}
        {...inputProps}
      />
      <FormControlErrors errors={errors} />
    </FormControl>
  );
}

const Input = styled("input", styles.inputRecipe);

type Test = ComponentProps<typeof Input>["size"];
