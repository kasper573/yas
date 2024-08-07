import type { Meta, StoryObj } from "@storybook/react";
import { TabItem, Tabs } from "@yas/ui";

export default {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export const Contained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    intent: "contained" as const,
    children: <TabItems />,
  },
};

export const ItemContained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    intent: "item-contained" as const,
    children: <TabItems />,
  },
};

export const TextHighlight: StoryObj<Meta<typeof Tabs>> = {
  args: {
    intent: "text-highlight" as const,
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
