import { ChevronLeftIcon, ChevronRightIcon } from "@yas/icons";
import type {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
} from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { clsx } from "@yas/style";
import * as styles from "./Calendar.css";

export type CalendarProps =
  | DayPickerSingleProps
  | DayPickerMultipleProps
  | DayPickerRangeProps;

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
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
