import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroupField } from "@yas/ui";
import { withState } from "./withState";

export default {
  component: CheckboxGroupField,
  decorators: [withState],
} satisfies Meta<typeof CheckboxGroupField<number>>;

export const Default: StoryObj<typeof CheckboxGroupField<number>> = {
  args: {
    label: "CheckboxGroupField",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
};
