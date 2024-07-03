import type { Meta, StoryObj } from "@storybook/react";
import { Paper } from "@yas/ui";

export default {
  component: Paper,
} satisfies Meta<typeof Paper>;

export const Default: StoryObj<Meta<typeof Paper>> = {
  args: { style: { width: 250, height: 250 } },
};
