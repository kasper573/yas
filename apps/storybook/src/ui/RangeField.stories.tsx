import type { Meta, StoryObj } from "@storybook/react";
import { withState } from "./withState";
import { RangeField } from "@yas/ui";

export default {
  component: RangeField,
  decorators: [withState],
} satisfies Meta<typeof RangeField>;

export const Default: StoryObj<typeof RangeField> = {
  args: {
    min: 0,
    max: 10,
    label: "RangeField",
  },
};
