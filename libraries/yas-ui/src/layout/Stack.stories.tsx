import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Box } from "./Box";

const meta = {
  title: "layout/Stack",
  component: Stack,
  tags: ["autodocs"],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sx: { width: "150px", height: "150px" },
    children: (
      <>
        <Box sx={{ background: "info.main", color: "info.contrast" }}>One</Box>
        <Box sx={{ background: "info.main", color: "info.contrast" }}>Two</Box>
        <Box sx={{ background: "info.main", color: "info.contrast" }}>
          Three
        </Box>
      </>
    ),
  },
};
