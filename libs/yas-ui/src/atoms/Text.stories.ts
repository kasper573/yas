import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

export default {
  title: "Text",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export const Default: StoryObj<Meta<typeof Text>> = {
  args: { children: "Hello World" },
};
