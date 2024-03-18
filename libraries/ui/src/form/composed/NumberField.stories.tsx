import type { Meta, StoryObj } from "@yas/storybook";
import { withState } from "../shared/withState";
import { NumberField } from "./NumberField";

export default {
  component: NumberField,
  decorators: [withState],
} satisfies Meta<typeof NumberField>;

export const Default: StoryObj<typeof NumberField> = {
  args: {
    label: "NumberField",
  },
};
