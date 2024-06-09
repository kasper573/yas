import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../shared/withState";
import { NumberField } from "./NumberField";

export default {
  component: NumberField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof NumberField>;

export const Default: StoryObj<typeof NumberField> = {
  args: {
    label: "NumberField",
  },
};
