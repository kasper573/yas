import { ChevronLeftIcon, ChevronRightIcon } from "@yas/icons";
import type {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
} from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { clsx } from "@yas/style";
import { useMemo } from "react";
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
  const classNames = useMemo(
    () => ({
      cell: cell({ range }),
      ...defaultClassNames,
      ...overrideClassNames,
    }),
    [range, overrideClassNames],
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx(base, className)}
      classNames={classNames}
      components={components}
      {...props}
    />
  );
}

const components = {
  IconLeft: () => <ChevronLeftIcon />,
  IconRight: () => <ChevronRightIcon />,
};
