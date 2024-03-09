import type { ComponentProps } from "react";
import { useId } from "react";
import type { RecipeVariants } from "@yas/style";
import { clsx } from "@yas/style";
import { Cross1Icon } from "@yas/icons";
import { InputArea, InputRoot, InputSlot } from "../components/Input";
import { Button } from "../components/Button";
import { CircularProgress } from "../components/CircularProgress";
import type { FieldProps } from "./shared/types";
import {
  FormControl,
  FormControlError,
  FormControlLabel,
  type FormControlProps,
} from "./shared/FormControl";
import * as styles from "./TextField.css";

export type TextFieldBaseProps = Pick<
  FormControlProps,
  "sx" | "style" | "className"
> &
  Omit<RecipeVariants<typeof styles.control>, "onChange"> & {
    clearable?: boolean;
    type?: "text" | "number" | "password";
    readOnly?: boolean;
    inputProps?: Omit<
      ComponentProps<typeof InputArea>,
      "value" | "onChange" | "onFocus" | "onBlur" | "type" | "size" | "children"
    >;
  };

export type TextFieldProps = TextFieldBaseProps & FieldProps<string>;

export function TextField({
  value,
  onChange,
  type,
  inputProps,
  fullWidth,
  className,
  isLoading,
  label,
  error,
  required,
  size,
  clearable,
  readOnly,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const isEmpty = value === undefined;

  function tryClearValue() {
    if (!required) {
      onChange?.(undefined);
    }
  }

  return (
    <FormControl
      {...rest}
      className={clsx(className, styles.control({ fullWidth }))}
    >
      <FormControlLabel className={styles.label} htmlFor={id}>
        {label}
      </FormControlLabel>
      <InputRoot size={size} error={error !== undefined}>
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
          readOnly={readOnly}
          {...inputProps}
          className={clsx(styles.input({ fullWidth }), inputProps?.className)}
          onKeyDown={(e) => {
            if (clearable && e.key === "Escape") {
              tryClearValue();
            }
            inputProps?.onKeyDown?.(e);
          }}
        />
        <InputSlot>
          {isLoading ? (
            <CircularProgress className={styles.loadingSpinner} />
          ) : (
            <Button
              icon
              variant="text"
              onClick={tryClearValue}
              className={styles.clearButton({
                visible: clearable && !isEmpty,
              })}
            >
              <Cross1Icon />
            </Button>
          )}
        </InputSlot>
      </InputRoot>
      <FormControlError error={error} />
    </FormControl>
  );
}
