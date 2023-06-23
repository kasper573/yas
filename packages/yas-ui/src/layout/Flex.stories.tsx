import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";

const meta = {
  title: "Flex",
  component: Flex,
  tags: ["autodocs"],
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    direction: "row",
    children: (
      <>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    children: (
      <>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </>
    ),
  },
};
