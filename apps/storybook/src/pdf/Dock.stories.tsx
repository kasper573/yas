import type { Meta, StoryObj } from "@storybook/react";
import { Dock } from "@yas/pdf";
import { withPDFViewer } from "./withPDFViewer";

const meta = {
  component: Dock,

  decorators: [withPDFViewer()],
} satisfies Meta<typeof Dock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sx: {
      backgroundColor: "error.base",
      width: 100,
      height: 100,
    },
    position: "bottomLeft",
  },
};
