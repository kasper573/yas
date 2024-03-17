import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "./AlertDialog";

export default {
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export const Default: StoryObj<Meta<typeof AlertDialog>> = {
  args: {
    title: "Title",
    message: "Message",
    resolve: () => alert("resolve() called"),
  },
};
