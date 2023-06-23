import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Text",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CanDisplayText: Story = {
  args: {
    children: "Hello World",
  },
};
