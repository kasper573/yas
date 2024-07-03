import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "@yas/ui";

const meta = {
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          margin: 8,
          padding: 8,
          background: "gray",
          color: "white",
        }}
      >
        This content should be responsive
      </div>
    ),
  },
};
