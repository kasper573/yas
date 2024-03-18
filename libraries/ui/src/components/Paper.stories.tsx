import type { Meta, StoryObj } from "@yas/storybook";
import { Paper } from "./Paper";

export default {
  component: Paper,
} satisfies Meta<typeof Paper>;

export const Default: StoryObj<Meta<typeof Paper>> = {
  args: { style: { width: 250, height: 250 } },
};
