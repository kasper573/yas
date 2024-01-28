import type { Meta, StoryObj } from "@storybook/react";
import { withState } from "../shared/withState";
import { CheckboxGroupField } from "./CheckboxGroupField";

export default {
  component: CheckboxGroupField,
  decorators: [withState],
  tags: ["autodocs"],
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
