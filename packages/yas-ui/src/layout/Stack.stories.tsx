import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta = {
  title: "Stack",
  component: Stack,
  tags: ["autodocs"],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    variants: {
      direction: "row",
    },
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
    variants: {
      direction: "column",
    },
    children: (
      <>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </>
    ),
  },
};
