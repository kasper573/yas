import { ChevronLeftIcon, ChevronRightIcon } from "@yas/icons";
import type {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
} from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { clsx } from "@yas/style";
import * as styles from "./Calendar.css";
export type { DateRange } from "react-day-picker";

export type SingleCalendarProps = DayPickerSingleProps;
export type RangeCalendarProps = DayPickerRangeProps;
export type MultipleCalendarProps = DayPickerMultipleProps;

export type CalendarProps =
  | SingleCalendarProps
  | RangeCalendarProps
  | MultipleCalendarProps;

const { base, cell, ...defaultClassNames } = styles;

export function Calendar({
  className,
  classNames: overrideClassNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const range = props.mode === "range";
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx(base, className)}
      classNames={{
        cell: cell({ range }),
        ...defaultClassNames,
        ...overrideClassNames,
      }}
      components={components}
      {...props}
    />
  );
}

const components = {
  IconLeft: () => <ChevronLeftIcon />,
  IconRight: () => <ChevronRightIcon />,
};
