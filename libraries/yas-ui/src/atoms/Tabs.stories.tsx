import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import { TabItem, Tabs } from "./Tabs";

export default {
  title: "atoms/Tabs",
  component: TabsExample,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export const Contained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "contained",
  },
};

export const ItemContained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "item-contained",
  },
};

export const TextHighlight: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "text-highlight",
  },
};

function TabsExample(props: ComponentProps<typeof Tabs>) {
  const [active, setActive] = useState(0);
  return (
    <Tabs {...props}>
      <TabItem active={active === 0} onClick={() => setActive(0)}>
        Foo
      </TabItem>
      <TabItem active={active === 1} onClick={() => setActive(1)}>
        Bar
      </TabItem>
      <TabItem active={active === 2} onClick={() => setActive(2)}>
        Baz
      </TabItem>
    </Tabs>
  );
}
