import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { RangeField } from "./RangeField";
import { withState } from "./shared/withState";

export default {
  component: RangeField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof RangeField>;

export const Default: StrictStoryObj<typeof RangeField> = {
  args: {
    min: 0,
    max: 10,
    label: "RangeField",
  },
};
