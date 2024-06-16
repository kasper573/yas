import type { Meta, StoryObj } from "@yas/test/storybook";
import { Example } from "./Example";

const meta = {
  component: Example,
} satisfies Meta<typeof Example>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
