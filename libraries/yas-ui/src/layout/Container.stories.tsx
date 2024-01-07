import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import { Box } from "./Box";

const meta = {
  title: "layout/Container",
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Box
        sx={{
          m: "#1",
          background: "info.base.main",
          color: "info.contrast.main",
        }}
      >
        This content should be responsive
      </Box>
    ),
  },
};
