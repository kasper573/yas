import type { Meta, StoryObj } from "@yas/storybook";
import { Container } from "./Container";

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
