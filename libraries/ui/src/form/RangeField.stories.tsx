import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../hooks/withState";
import { RangeField } from "./RangeField";

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
