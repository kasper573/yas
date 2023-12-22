import type { Meta, StoryObj } from "@storybook/react";
import { Void } from "./Void";
import { Box } from "./Box";
import { Stack } from "./Stack";

const meta = {
  title: "layout/Void",
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <Stack direction="row" align="center" sx={{ background: "success.main" }}>
        Hello
        <Void>
          <Box
            sx={{
              background: "error.main",
              padding: "#3",
              typography: "h3",
            }}
          >
            Void
          </Box>
        </Void>
        World
      </Stack>
    );
  },
};
