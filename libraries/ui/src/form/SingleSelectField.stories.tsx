import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../hooks/withState";
import { SingleSelectField } from "./SingleSelectField";

export default {
  component: SingleSelectField,
  decorators: [withState],
  tags: ["autodocs"],
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
