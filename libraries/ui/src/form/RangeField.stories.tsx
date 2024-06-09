import type { Meta, StoryObj } from "@yas/test/storybook";
import { RangeField } from "./RangeField";
import { withState } from "./shared/withState";

export default {
  component: RangeField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof RangeField>;

export const Default: StoryObj<typeof RangeField> = {
  args: {
    min: 0,
    max: 10,
    label: "RangeField",
  },
};
