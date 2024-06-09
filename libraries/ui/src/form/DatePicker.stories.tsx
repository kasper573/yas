import type { Meta, StoryObj } from "@yas/test/storybook";
import { DatePicker } from "./DatePicker";
import { withState } from "./shared/withState";

export default {
  component: DatePicker,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export const Default: StoryObj<typeof DatePicker> = {};
