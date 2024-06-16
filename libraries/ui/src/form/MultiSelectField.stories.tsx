import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../hooks/withState";
import { MultiSelectField } from "./MultiSelectField";

export default {
  component: MultiSelectField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelectField<number>>;

export const Default: StoryObj<typeof MultiSelectField<number>> = {
  args: {
    label: "MultiSelectField",
    emptyOptionText: "Select something...",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
    ],
  },
};
