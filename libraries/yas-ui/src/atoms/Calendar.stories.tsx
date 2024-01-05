import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Calendar } from "./Calendar";

export default {
  title: "atoms/Calendar",
  component: UncontrolledCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

type Story = StoryObj<Meta<typeof Calendar>>;

export const Default: Story = {
  args: {} as Story["args"], // For some reason react-day-picker has issues with storybook and typescript, so we have to assert
};

function UncontrolledCalendar(props: ComponentProps<typeof Calendar>) {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}
