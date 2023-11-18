import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export const Default: StoryObj<Meta<typeof Button>> = {
  args: { children: "Click me" },
};
