import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@yas/ui";

export default {
  component: Alert,
};

export const Default: StoryObj<Meta<typeof Alert>> = {
  args: { children: <>Alert!</> },
};
