import type { Meta, StoryObj } from "@storybook/react";
import { Dock } from "@yas/ui";

const meta = {
  component: Dock,
} satisfies Meta<typeof Dock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { background: "red", minWidth: "100px", minHeight: "100px" },
  },
};
