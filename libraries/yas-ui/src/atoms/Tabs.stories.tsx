import type { Meta, StoryObj } from "@storybook/react";
import { TabItem, Tabs } from "./Tabs";

export default {
  title: "atoms/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export const Contained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "contained",
    children: (
      <>
        <TabItem active>Foo</TabItem>
        <TabItem>Bar</TabItem>
        <TabItem>Baz</TabItem>
      </>
    ),
  },
};

export const ItemContained: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "item-contained",
    children: (
      <>
        <TabItem active>Foo</TabItem>
        <TabItem>Bar</TabItem>
        <TabItem>Baz</TabItem>
      </>
    ),
  },
};

export const TextHighlight: StoryObj<Meta<typeof Tabs>> = {
  args: {
    variant: "text-highlight",
    children: (
      <>
        <TabItem active>Foo</TabItem>
        <TabItem>Bar</TabItem>
        <TabItem>Baz</TabItem>
      </>
    ),
  },
};
