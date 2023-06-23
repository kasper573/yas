import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta = {
  title: "Container",
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HasResponsiveSize: Story = {
  args: {
    css: { backgroundColor: "red" },
  },
};
