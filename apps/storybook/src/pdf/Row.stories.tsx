import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Text, Row } from "@yas/pdf";
import { withPDFViewer } from "./withPDFViewer";

const meta = {
  component: Row,

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
