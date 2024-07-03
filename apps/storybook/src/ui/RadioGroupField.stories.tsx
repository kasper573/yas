import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroupField } from "@yas/ui";
import { withState } from "./withState";

export default {
  component: RadioGroupField,
  decorators: [withState],
} satisfies Meta<typeof RadioGroupField<number>>;

export const Default: StoryObj<typeof RadioGroupField<number>> = {
  args: {
    label: "RadioGroupField",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
};
