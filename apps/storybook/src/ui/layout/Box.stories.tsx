import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@yas/ui";

const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
