import type { Meta, StoryObj } from "@storybook/react";
import { Text, Divider } from "@yas/pdf";
import { withPDFViewer } from "./withPDFViewer";

const meta = {
  component: Divider,

  decorators: [withPDFViewer()],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(props) {
    return (
      <>
        <Text>Above</Text>
        <Divider {...props} />
        <Text>Below</Text>
      </>
    );
  },
};
