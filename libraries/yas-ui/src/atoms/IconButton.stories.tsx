import type { Meta, StoryObj } from "@storybook/react";
import { Cross1Icon } from "@yas/icons";
import { IconButton } from "./IconButton";

export default {
  title: "atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export const Default: StoryObj<Meta<typeof IconButton>> = {
  args: { children: <Cross1Icon /> },
};
