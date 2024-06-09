import type { Meta, StoryObj } from "@yas/test/storybook";
import { withPDFViewer } from "../../../devtools/withPDFViewer";
import { Text } from "../react-pdf";
import { Divider } from "./Divider";

const meta = {
  component: Divider,
  tags: ["autodocs"],
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
