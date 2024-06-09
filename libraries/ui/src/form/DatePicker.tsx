import { CalendarIcon } from "@yas/icons";
import type { FormatPreset } from "@yas/time";
import { format } from "@yas/time";
import type { ButtonProps } from "../components/Button";
import { Button } from "../components/Button";
import { Calendar } from "../molecules/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import { Stack } from "../layout/Stack";
import { Paper } from "../components/Paper";
import type { FieldProps } from "./shared/types";
import { datePickerText } from "./DatePicker.css";

export type DatePickerProps = FieldProps<Date> &
  Pick<ButtonProps, "intent" | "style" | "className"> & {
    format?: FormatPreset;
  };

export function DatePicker({
  value,
  onChange,
  error,
  required,
  info,
  isLoading,
  label,
  metrics,
  format: formatPreset = "long-date",
  intent = "outline",
  sx,
  style,
  className,
  ...rest
}: DatePickerProps) {
  function tryEmitChangedDate(date?: Date) {
    if (required) {
      if (date) {
        onChange?.(date);
      }
    } else {
      onChange?.(date);
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...{ sx, style, className, intent }}>
          <Stack
            direction="row"
            gap="m"
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
            onSelect={tryEmitChangedDate}
            initialFocus
            required={required}
          />
        </Paper>
      </PopoverContent>
    </Popover>
  );
}
