import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@yas/ui";
import { withState } from "../withState";

export default {
  component: DatePicker,
  decorators: [withState],
} satisfies Meta<typeof DatePicker>;

export const Default: StoryObj<typeof DatePicker> = {};
