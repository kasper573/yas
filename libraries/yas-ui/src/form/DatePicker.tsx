import { CalendarIcon } from "@yas/icons";
import type { FormatPreset } from "@yas/time";
import { format } from "@yas/time";
import type { ButtonProps } from "../atoms/Button";
import { Button } from "../atoms/Button";
import { Calendar } from "../atoms/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/Popover";
import { Stack } from "../layout/Stack";
import type { FieldProps } from "./rcf";
import { datePickerText } from "./DatePicker.css";

export interface DatePickerProps
  extends FieldProps<Date>,
    Pick<ButtonProps, "variant" | "color"> {
  format?: FormatPreset;
}

export function DatePicker({
  value,
  onChange,
  errors,
  required,
  fieldValues,
  info,
  isLoading,
  label,
  metrics,
  name,
  format: formatPreset = "long-date",
  variant = "outlined",
  color = "surface-contrast",
  ...rest
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} color={color} {...rest}>
          <Stack
            direction="row"
            gap="#2"
            align="center"
            className={datePickerText}
          >
            <CalendarIcon />
            {value ? format(value, formatPreset) : <span>Pick a date</span>}
          </Stack>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          required={required}
        />
      </PopoverContent>
    </Popover>
  );
}
