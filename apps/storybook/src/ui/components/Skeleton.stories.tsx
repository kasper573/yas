import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@yas/ui";

export default {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export const Default: StoryObj<Meta<typeof Skeleton>> = {
  args: { style: { width: 250, height: 250 } },
};
