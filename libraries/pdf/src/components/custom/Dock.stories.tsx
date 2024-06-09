import type { Meta, StoryObj } from "@yas/test/storybook";
import { withPDFViewer } from "../../../devtools/withPDFViewer";
import { Dock } from "./Dock";

const meta = {
  component: Dock,
  tags: ["autodocs"],
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
