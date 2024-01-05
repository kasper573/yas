import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange } from "./Calendar";
import { Calendar } from "./Calendar";

export default {
  title: "atoms/Calendar",
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export const Single: StoryObj = {
  render: () => <SingleCalendar />,
};

export const Range: StoryObj = {
  render: () => <RangeCalendar />,
};

export const Multiple: StoryObj = {
  render: () => <MultiCalendar />,
};

function SingleCalendar() {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: new Date(),
    to: new Date(),
  }));
  return <Calendar mode="range" selected={range} onSelect={setRange} />;
}

function MultiCalendar() {
  const [dates, setDates] = useState<Date[] | undefined>(() => [new Date()]);
  return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
}
