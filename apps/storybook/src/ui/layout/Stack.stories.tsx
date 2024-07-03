import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Stack } from "@yas/ui";

const meta = {
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: "150px", height: "150px" },
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
  return <div style={styles.item}>{children}</div>;
}

const styles = {
  item: {
    margin: 8,
    padding: 8,
    background: "gray",
    color: "white",
  },
};
