import type { Meta, StoryObj } from "@storybook/react";
import { Cross1Icon } from "@yas/icons";
import { Button } from "./Button";

export default {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export const Text: StoryObj<Meta<typeof Button>> = {
  args: { children: "Click me" },
};

export const Icon: StoryObj<Meta<typeof Button>> = {
  args: { icon: true, children: <Cross1Icon /> },
};
