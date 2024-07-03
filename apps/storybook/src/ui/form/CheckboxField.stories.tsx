import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxField } from "@yas/ui";
import { withState } from "../withState";

export default {
  component: CheckboxField,
  decorators: [withState],
} satisfies Meta<typeof CheckboxField>;

export const Default: StoryObj<typeof CheckboxField> = {
  args: {
    label: "CheckboxField",
  },
};
