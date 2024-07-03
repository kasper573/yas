import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "@yas/ui";

export default {
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

export const Default: StoryObj<Meta<typeof AlertDialog>> = {
  args: {
    title: "Title",
    message: "Message",
    resolve: () => alert("resolve() called"),
  },
};
