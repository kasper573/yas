import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { SingleSelectField } from "./SingleSelectField";
import { withState } from "./shared/withState";

export default {
  component: SingleSelectField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof SingleSelectField<number>>;

export const Default: StrictStoryObj<typeof SingleSelectField<number>> = {
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
