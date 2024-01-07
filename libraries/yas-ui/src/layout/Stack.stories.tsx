import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
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
        <ExampleItem>One</ExampleItem>
        <ExampleItem>Two</ExampleItem>
        <ExampleItem>Three</ExampleItem>
      </>
    ),
  },
};

function ExampleItem({ children }: { children?: ReactNode }) {
  return (
    <Box
      sx={{
        m: "#1",
        background: "info.base.main",
        color: "info.contrast.main",
      }}
    >
      {children}
    </Box>
  );
}
