import { styled } from "@yas/style";
import type { ComponentProps } from "react";

export type DatePickerChangeHandler = (value: Date) => void;

export interface DatePickerProps
  extends Omit<DateInputProps, "value" | "onChange"> {
  value?: Date;
  onChange?: DatePickerChangeHandler;
}

export function DatePicker({ value, onChange, ...rest }: DatePickerProps) {
  const isoDateString = value?.toISOString().split("T")[0];
  return (
    <DateInput
      value={isoDateString}
      onChange={transformEventHandler(onChange)}
      {...rest}
    />
  );
}

function transformEventHandler(
  onChange?: DatePickerChangeHandler,
): DateInputProps["onChange"] {
  if (!onChange) {
    return;
  }
  return (event) => {
    if (event.target.valueAsDate) {
      onChange(event.target.valueAsDate);
    }
  };
}

type DateInputProps = ComponentProps<typeof DateInput>;

const DateInput = styled("input").attrs({ type: "date" });
