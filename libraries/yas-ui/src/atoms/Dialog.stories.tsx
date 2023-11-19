import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";

export default {
  title: "atoms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export const Default: StoryObj<Meta<typeof Dialog>> = {
  args: { children: "Hello World!", open: true },
};
