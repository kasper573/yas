import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { RadioGroupField } from "./RadioGroupField";
import { withState } from "./shared/withState";

export default {
  component: RadioGroupField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupField<number>>;

export const Default: StrictStoryObj<typeof RadioGroupField<number>> = {
  args: {
    label: "RadioGroupField",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
};
