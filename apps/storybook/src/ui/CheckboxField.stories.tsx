import type { Meta, StoryObj } from "@storybook/react";
import { withState } from "./withState";
import { CheckboxField } from "@yas/ui";

export default {
  component: CheckboxField,
  decorators: [withState],
} satisfies Meta<typeof CheckboxField>;

export const Default: StoryObj<typeof CheckboxField> = {
  args: {
    label: "CheckboxField",
  },
};
