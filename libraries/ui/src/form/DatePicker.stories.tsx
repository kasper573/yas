import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../hooks/withState";
import { DatePicker } from "./DatePicker";

export default {
  component: DatePicker,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export const Default: StoryObj<typeof DatePicker> = {};
