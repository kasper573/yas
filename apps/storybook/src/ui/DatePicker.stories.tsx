import type { Meta, StoryObj } from "@storybook/react";
import { withState } from "./withState";
import { DatePicker } from "@yas/ui";

export default {
  component: DatePicker,
  decorators: [withState],
} satisfies Meta<typeof DatePicker>;

export const Default: StoryObj<typeof DatePicker> = {};
