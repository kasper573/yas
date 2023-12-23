import type { Meta, StoryObj } from "@storybook/react";
import { Dock } from "./Dock";

const meta = {
  title: "layout/Dock",
  component: Dock,
  tags: ["autodocs"],
} satisfies Meta<typeof Dock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { background: "red", minWidth: "100px", minHeight: "100px" },
  },
};
