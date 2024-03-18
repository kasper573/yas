import type { Meta, StoryObj } from "@yas/storybook";
import { Dock } from "./Dock";

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
