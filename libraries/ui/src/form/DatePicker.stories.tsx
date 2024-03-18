import type { Meta, StoryObj } from "@yas/storybook";
import { DatePicker } from "./DatePicker";
import { withState } from "./shared/withState";

export default {
  component: DatePicker,
  decorators: [withState],
} satisfies Meta<typeof DatePicker>;

export const Default: StoryObj<typeof DatePicker> = {};
