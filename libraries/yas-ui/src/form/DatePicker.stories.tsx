import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { DatePicker } from "./DatePicker";

export default {
  component: DatePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export const Default: StrictStoryObj<typeof DatePicker> = {
  render(props) {
    const [value, setValue] = useState<Date | undefined>(() => new Date());
    return <DatePicker {...props} value={value} onChange={setValue} />;
  },
};
