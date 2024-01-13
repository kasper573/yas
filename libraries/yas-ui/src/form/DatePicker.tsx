import { CalendarIcon } from "@yas/icons";
import type { FormatPreset } from "@yas/time";
import { format } from "@yas/time";
import type { ButtonProps } from "../components/Button";
import { Button } from "../components/Button";
import { Calendar } from "../organisms/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import { Stack } from "../layout/Stack";
import { Paper } from "../components/Paper";
import type { FieldProps } from "./shared/rcf";
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
        <Paper>
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            required={required}
          />
        </Paper>
      </PopoverContent>
    </Popover>
  );
}
