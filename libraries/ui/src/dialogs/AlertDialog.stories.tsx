import type { Meta, StoryObj } from "@yas/storybook";
import { AlertDialog } from "./AlertDialog";

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
