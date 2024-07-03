import type { Meta, StoryObj } from "@storybook/react";
import { RangeField } from "@yas/ui";
import { withState } from "./withState";

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
