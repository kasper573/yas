import type { Meta, StoryObj } from "@storybook/react";
import { TabItem, Tabs } from "./Tabs";

export default {
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export const Contained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "contained" as const,
    children: <TabItems />,
  },
};

export const ItemContained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "item-contained" as const,
    children: <TabItems />,
  },
};

export const TextHighlight: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "text-highlight" as const,
    children: <TabItems />,
  },
};

function TabItems() {
  return (
    <>
      <TabItem active>Foo</TabItem>
      <TabItem>Bar</TabItem>
      <TabItem>Baz</TabItem>
    </>
  );
}
