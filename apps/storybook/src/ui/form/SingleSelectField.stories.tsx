import type { Meta, StoryObj } from "@storybook/react";
import { SingleSelectField } from "@yas/ui";
import { withState } from "../withState";

export default {
  component: SingleSelectField,
  decorators: [withState],
} satisfies Meta<typeof SingleSelectField<number>>;

export const Default: StoryObj<typeof SingleSelectField<number>> = {
  args: {
    label: "SingleSelectField",
    emptyOptionText: "Select something...",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
};
