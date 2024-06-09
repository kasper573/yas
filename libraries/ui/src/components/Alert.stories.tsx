import type { Meta, StoryObj } from "@yas/test/storybook";
import { Alert } from "./Alert";

export default {
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export const Default: StoryObj<Meta<typeof Alert>> = {
  args: { children: <>Alert!</> },
};
