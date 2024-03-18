import type { Meta, StoryObj } from "@yas/storybook";
import { Alert } from "./Alert";

export default {
  component: Alert,
} satisfies Meta<typeof Alert>;

export const Default: StoryObj<Meta<typeof Alert>> = {
  args: { children: <>Alert!</> },
};
