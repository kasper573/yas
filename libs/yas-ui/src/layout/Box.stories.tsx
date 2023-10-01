import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta = {
  title: "Box",
  component: Box,
  tags: ["autodocs"],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AcceptsAnyInlineCSS: Story = {
  args: {
    sx: { backgroundColor: "blue-50", color: "gray-700" },
    children: "Hello world",
  },
};
