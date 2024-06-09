import type { Meta, StoryObj } from "@yas/test/storybook";
import type { ReactNode } from "react";
import { withPDFViewer } from "../../../devtools/withPDFViewer";
import { Text } from "../react-pdf";
import { Row } from "./Row";

const meta = {
  component: Row,
  tags: ["autodocs"],
  decorators: [withPDFViewer()],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: "l",
    style: {
      backgroundColor: "skyblue",
      padding: 12,
      width: "100%",
      minHeight: 250,
    },
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
    <Text style={{ backgroundColor: "grey", color: "black", flex: 1 }}>
      {children}
    </Text>
  );
}
