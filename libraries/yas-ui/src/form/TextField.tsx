import type { ComponentProps } from "react";
import { useId } from "react";
import type { RecipeVariants } from "@yas/style";
import { clsx } from "@yas/style";
import { Cross1Icon } from "@yas/icons";
import { InputArea, InputRoot, InputSlot } from "../atoms/Input";
import { IconButton } from "../atoms/IconButton";
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
    RecipeVariants<typeof styles.control> {
  clearable?: boolean;
  type?: "text" | "number" | "password";
  inputProps?: Omit<
    ComponentProps<typeof InputArea>,
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
  clearable,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const isEmpty = value === undefined;
  return (
    <FormControl
      {...rest}
      className={clsx(className, styles.control({ fullWidth }))}
    >
      <FormControlLabel className={styles.label} htmlFor={id}>
        {label}
      </FormControlLabel>
      <InputRoot size={size} error={!!errors?.length}>
        <InputArea
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
          autoComplete="off"
          required={required}
          {...inputProps}
          className={clsx(styles.input({ fullWidth }), inputProps?.className)}
          onKeyDown={(e) => {
            if (clearable && e.key === "Escape") {
              onChange?.(undefined);
            }
            inputProps?.onKeyDown?.(e);
          }}
        />
        <InputSlot>
          <IconButton
            variant="text"
            onClick={() => onChange?.(undefined)}
            className={styles.clearButton({ visible: clearable && !isEmpty })}
          >
            <Cross1Icon />
          </IconButton>
        </InputSlot>
      </InputRoot>
      <FormControlErrors errors={errors} />
    </FormControl>
  );
}
