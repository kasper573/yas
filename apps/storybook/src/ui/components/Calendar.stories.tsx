import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange, RangeCalendarProps } from "@yas/ui";
import { Calendar } from "@yas/ui";

export default {
  component: () => null,
} satisfies Meta;

export const Single: StoryObj = {
  render: () => <SingleCalendar />,
};

export const Range: StoryObj = {
  render: () => <RangeCalendar />,
};

export const RangeSeveralMonths: StoryObj = {
  render: () => <RangeCalendar numberOfMonths={3} />,
};

export const Multiple: StoryObj = {
  render: () => <MultiCalendar />,
};

function SingleCalendar() {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

function RangeCalendar(props: Partial<RangeCalendarProps>) {
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: new Date(),
    to: new Date(),
  }));
  return (
    <Calendar mode="range" selected={range} onSelect={setRange} {...props} />
  );
}

function MultiCalendar() {
  const [dates, setDates] = useState<Date[] | undefined>(() => [new Date()]);
  return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
}
