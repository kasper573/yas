import type { Meta, StoryObj } from "@yas/storybook";
import { Divider } from "./Divider";

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
